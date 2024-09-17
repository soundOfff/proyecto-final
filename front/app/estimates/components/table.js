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
      width: 50,
      Cell: ({ value }) => (
        <Link
          href={`/estimates/${value}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {value}
        </Link>
      ),
    },
    {
      Header: "Importe",
      accessor: "total",
      Cell: ({ value }) => moneyFormat(value),
    },
    {
      Header: "Impuesto Total",
      accessor: "totalTax",
      Cell: ({ value }) => moneyFormat(value),
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
      accessor: "project.name",
      width: 500,
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
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Fecha De Caducidad",
      accessor: "expiryDate",
    },
    {
      id: "readyForBill",
      Header: "Lista para facturar",
      Cell: ({ row }) => {
        return row.original.isReadyForBill === 1 ? "Sí" : "No";
      },
    },
    {
      id: "serviceType",
      Header: "Departamento",
      accessor: "project.serviceType",
      Cell: ({ row }) => row.original.project?.serviceType?.label,
    },
    {
      id: "actions",
      Header: "Acciones",
      width: 50,
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Link
            href={`/estimates/${row.original.id}/edit`}
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
      <DataTable
        table={table}
        meta={meta}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
        actions={
          <Link href="/estimates/create">
            <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
              Registrar Proforma
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
