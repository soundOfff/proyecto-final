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
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const columns = [
    {
      id: "invoice-id",
      Header: "Factura",
      Cell: ({ row }) =>
        row.original.invoice && (
          <Link href={`/invoices/${row.original.invoice.id}`}>
            {row.original.invoice.prefix}
            {row.original.invoice.number}
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
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
