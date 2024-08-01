"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";
import { destroy } from "/actions/files";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MDTypography from "/components/MDTypography";
import { MAPPED_FILEABLE_TYPES } from "/utils/constants/fileableTypes";

export default function Table({ rows, meta }) {
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
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

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
    {
      id: "fileable_id",
      Header: "Nombre relacionado",
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
    },
    {
      id: "url",
      Header: "URL",
      accessor: "publicUrl",
      Cell: ({ value }) => (
        <Link href={value} target="_blank" sx={{ color: "info" }}>
          <MDTypography
            variant="button"
            color="link"
            fontSize="small"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              color: "info",
            }}
          >
            Ver archivo
            <PictureAsPdfIcon fontSize="small" />
          </MDTypography>
        </Link>
      ),
    },
    {
      id: "acciones",
      Header: "Acciones",
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

  return (
    <MDBox>
      <DataTable
        table={table}
        meta={meta}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
