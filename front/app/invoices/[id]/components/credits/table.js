"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";
import { destroy } from "/actions/credits";
import numberFormat from "/utils/numberFormat";
import Link from "next/link";

export default function Table({ rows }) {
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

  const columns = [
    {
      id: "credit-note-id",
      Header: "Nota de Crédito",
      Cell: ({ row }) =>
        row.original.creditNote && (
          <Link href={`/credit-notes/${row.original.creditNote.id}`}>
            {row.original.creditNote.prefix}
            {row.original.creditNote.number}
          </Link>
        ),
    },
    {
      id: "date",
      Header: "Fecha",
      accessor: "date",
    },
    {
      id: "amount",
      Header: "Importe de Crédito",
      accessor: "amount",
      Cell: ({ value }) => <>$ {numberFormat(value)}</>,
    },
    {
      id: "acciones",
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <Tooltip title="Eliminar Crédito">
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
