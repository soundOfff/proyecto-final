"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import moneyFormat from "/utils/moneyFormat";
import { useMaterialUIController } from "/context";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { destroy } from "/actions/estimates";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";

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
      Header: "name",
      Cell: ({ row }) => (
        <Link
          href={`/credit-notes/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.prefix + row.original.number}
        </Link>
      ),
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ value }) => value?.label,
    },
    {
      id: "partner",
      Header: "Nombre",
      Cell: ({ row }) => (
        <Link
          href={`/partners/${row.original.partner?.id}/profile`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.partner?.company ?? row.original.partner?.name}
        </Link>
      ),
    },
    {
      id: "project",
      Header: "Caso",
      Cell: ({ row }) => {
        return row.original.project ? (
          <Link
            href={`/projects/${row.original.project?.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {row.original.project?.name}
          </Link>
        ) : null;
      },
    },
    {
      Header: "Referencia #",
      accessor: "referenceNo",
    },
    {
      Header: "Importe",
      accessor: "total",
      Cell: ({ value }) => moneyFormat(value),
    },
    {
      Header: "Importe Pendiente",
      accessor: "pendingCredits",
      Cell: ({ value }) => moneyFormat(value),
    },
    {
      id: "actions",
      Header: "Acciones",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Link
            href={`/credit-notes/${row.original.id}/edit`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            <Tooltip title="Editar" placement="top">
              <EditIcon fontSize="medium" color="warning" />
            </Tooltip>
          </Link>
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ ml: 3, cursor: "pointer" }}
            />
          </Tooltip>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href="/credit-notes/create">
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Nota de Crédito
          </MDButton>
        </Link>
      </MDBox>
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
