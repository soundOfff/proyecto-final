"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MDTypography from "/components/MDTypography";
import { MAPPED_FILEABLE_TYPES } from "/utils/constants/fileableTypes";
import DeleteRow from "/components/DeleteRow";
import Loader from "/components/Loader";

import useDeleteRow from "/hooks/useDeleteRow";

import { useEffect, useState } from "react";
import { destroy, getAll } from "/actions/files";
import { Box } from "@mui/material";

export default function Table({ project }) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFileableLabel = (row) =>
    row.fileable
      ? row.fileable[MAPPED_FILEABLE_TYPES[row.fileableType].key]
      : "Sin nombre";
  const getFileableUrl = (row) =>
    `${MAPPED_FILEABLE_TYPES[row.fileableType].url}${row.fileableId}`;

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
      width: "20%",
    },
    {
      id: "fileable_type",
      Header: "Relacionado con",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDTypography
          variant="button"
          color="dark"
          fontSize="small"
          sx={{ display: "flex" }}
        >
          {MAPPED_FILEABLE_TYPES[row.original.fileableType].label}
        </MDTypography>
      ),
    },
    /* {
      id: "fileable_id",
      Header: "Nombre relacionado",
      disableSortBy: true,
      width: "30%",
      Cell: ({ row }) => (
        <Link
          href={getFileableUrl(row.original)}
          sx={{ cursor: "pointer", color: "link" }}
        >
          <MDTypography variant="button" color="link" fontSize="small">
            {getFileableLabel(row.original)}
          </MDTypography>
        </Link>
      ),
    }, */
    {
      id: "url",
      Header: "URL",
      accessor: "publicUrl",
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
              color="inherit"
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
      Cell: ({ row }) => (
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
