"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LoopIcon from "@mui/icons-material/Loop";
import CheckIcon from "@mui/icons-material/Check";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MDTypography from "/components/MDTypography";
import DeleteRow from "/components/DeleteRow";
import Loader from "/components/Loader";

import useDeleteRow from "/hooks/useDeleteRow";

import { useEffect, useState } from "react";
import { destroy, getAll } from "/actions/files";
import CopyButton from "/components/CopyButton";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Table({ project }) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const filesDateFilter =
    dateFrom || dateTo ? { "filter[date]": `${dateFrom},${dateTo}` } : null;
  const filesSearchFilter = search ? { "filter[search]": search } : null;

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  useEffect(() => {
    getAll({
      "filter[fileable_id]": project.id,
      "filter[fileable_type]": "project",
      ...filesDateFilter,
      ...filesSearchFilter,
    }).then((data) => {
      setRows(data.data.files);
      setIsLoading(false);
    });
  }, [project]);

  const columns = [
    {
      id: "subject",
      Header: "Nombre",
      accessor: "subject",
      width: "45%",
    },
    {
      id: "url",
      Header: "URL",
      accessor: "publicUrl",
      width: "45%",
      disableSortBy: true,
      Cell: ({ value }) => (
        <Link href={value} target="_blank" sx={{ color: "info" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "info",
            }}
          >
            <MDTypography
              variant="button"
              color="link"
              mr={0.5}
              fontSize="small"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Ver archivo
            </MDTypography>
            <PictureAsPdfIcon fontSize="small" />
          </Box>
        </Link>
      ),
    },
    {
      id: "acciones",
      Header: "Acciones",
      disableSortBy: true,
      width: "10%",
      Cell: ({ row }) => (
        <MDBox>
          <CopyButton url={row.original.publicUrl} />
          <Tooltip title="Eliminar Archivo">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ mx: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return isLoading ? (
    <Loader />
  ) : (
    <MDBox>
      <DataTable
        table={table}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          errorMsg,
          setErrorSB,
          errorMsg,
          setErrorMsg,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
