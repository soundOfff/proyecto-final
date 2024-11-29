"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { destroy } from "/actions/estimates";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import MDTypography from "/components/MDTypography";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { useMaterialUIController, setSnackbar } from "/context";
import { useState } from "react";
import { toInvoice } from "/actions/estimates";

export default function Table({ rows, projectId }) {
  const [_, dispatch] = useMaterialUIController();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
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

  async function convertToInvoice(row) {
    setSelectedEstimate(row.original.id);
    try {
      setIsLoading(true);
      await toInvoice(row.original.id);
      setIsLoading(false);
      setSnackbar(dispatch, {
        color: "success",
        icon: "check",
        title: "Proforma convertida a factura",
        content: "La proforma ha sido convertida a factura",
        bgWhite: true,
      });
      setSelectedEstimate(null);
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al convertir a factura",
        content: error?.message,
        bgWhite: true,
      });
      setIsLoading(false);
      setSelectedEstimate(null);
    }
  }
  const columns = [
    {
      Header: "id",
      accessor: "id",
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
      id: "invoice",
      Header: "Factura asociada",
      accessor: "invoiceId",
      Cell: ({ row }) => (
        <Link
          href={{
            pathname: `/invoices/${row.original.invoiceId}`,
            query: { source: `/projects/${projectId}?tab=estimates` },
          }}
          sx={{ cursor: "pointer", mx: "auto" }}
        >
          {row.original.invoiceId}
        </Link>
      ),
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
      id: "actions",
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Convertir a factura" placement="top">
            {isLoading && row.original.id === selectedEstimate ? (
              <CircularProgress size={24} color="dark" />
            ) : (
              !row.original.invoiceId && (
                <PaymentsOutlinedIcon
                  fontSize="medium"
                  color="success"
                  onClick={() => convertToInvoice(row)}
                  sx={{ cursor: "pointer", mr: 2 }}
                />
              )
            )}
          </Tooltip>
          {!row.original.invoiceId && (
            <Link
              href={{
                pathname: `/estimates/${row.original.id}/edit`,
                query: { source: `/projects/${projectId}?tab=estimates` },
              }}
              sx={{ cursor: "pointer" }}
            >
              <Tooltip title="Editar" placement="top">
                <EditIcon fontSize="medium" color="info" />
              </Tooltip>
            </Link>
          )}
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{ ml: 2, cursor: "pointer" }}
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
