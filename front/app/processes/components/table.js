"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMaterialUIController } from "/context";
import { Tooltip } from "@mui/material";
import { destroy } from "/actions/processes";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
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
      Header: "Nombre",
      Cell: ({ row }) => (
        <Link
          href={`/processes/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      Header: "Caso",
      accessor: "project",
      Cell: ({ value }) => (
        <Link
          href={`/projects/${value.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {value.name}
        </Link>
      ),
    },
    {
      Header: "Cant. de Pasos",
      accessor: "stepQuantity",
    },
    {
      Header: "Departamento",
      accessor: "department",
    },
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Fecha de creación",
      accessor: "createdAt",
    },
    {
      id: "actions",
      Header: "Acciones",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ ml: 1, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
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
