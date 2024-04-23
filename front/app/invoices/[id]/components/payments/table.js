"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";
import { destroy } from "/actions/payments";

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
      id: "id",
      Header: "id",
      accessor: "id",
    },
    {
      id: "paymentMethod",
      Header: "Modo de Cobro",
      Cell: ({ row }) => row.original.paymentMethod.label,
    },
    {
      id: "acciones",
      Header: "Acciones",
      Cell: ({ row }) => (
        <Tooltip title="Eliminar Cobro">
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
