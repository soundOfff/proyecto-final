"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDButton from "/components/MDButton";
import numberFormat from "/utils/numberFormat";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMaterialUIController } from "/context";
import { Tooltip } from "@mui/material";
import { destroy } from "/actions/proposals";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
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
      Header: "id",
      accessor: "id",
      Cell: ({ value }) => (
        <Link
          href={`/proposals/${value}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {value}
        </Link>
      ),
    },
    {
      Header: "Tema",
      accessor: "subject",
    },
    {
      Header: "Para",
      accessor: "proposable",
      Cell: ({ value }) => {
        return value && (value.company || value.name) ? (
          <Link
            href={`/partners/${value.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {value.company ?? value.name}
          </Link>
        ) : null;
      },
    },
    {
      Header: "Total",
      accessor: "total",
      Cell: ({ value }) => `$${numberFormat(value)}`,
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Válida Hasta",
      accessor: "openTill",
    },
    {
      Header: "Etiquetas",
      accessor: "tags",
      disableSortBy: true,
      Cell: ({ value }) =>
        value.length
          ? value.map((tag) => (
              <MDBadge
                key={tag.id}
                variant="gradient"
                color="dark"
                size="md"
                badgeContent={tag.name}
              />
            ))
          : null,
    },
    {
      Header: "Fecha de creación",
      accessor: "createdAt",
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ value }) => value.label,
    },
    {
      Header: "Comentarios",
      accessor: "comments",
      disableSortBy: true,
      Cell: ({ value }) =>
        value.length
          ? value.map((comment) => comment.content).join(", ")
          : null,
    },
    {
      id: "actions",
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Link
            href={`/proposals/${row.original.id}/edit`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            <Tooltip title="Editar" placement="top">
              <EditIcon fontSize="medium" color="warning" />
            </Tooltip>
          </Link>
          {!row.original.invoiceId && (
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
          )}
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
        actions={
          <Link href="/proposals/create">
            <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
              Registrar Propuesta
            </MDButton>
          </Link>
        }
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
