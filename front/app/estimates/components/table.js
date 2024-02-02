"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import moneyFormat from "/utils/moneyFormat";
import { useMaterialUIController } from "/context";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const columns = [
    {
      Header: "Proforma #",
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
      id: "partner_name",
      Header: "Nombre",
      Cell: ({ row }) => (
        <Link
          href={`/partners/${row.original.partner?.id}/profile`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.partner?.company}
        </Link>
      ),
    },
    {
      Header: "Caso",
      accessor: "project.name",
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
      Header: "Referencia #",
      accessor: "referenceNo",
    },
    {
      Header: "Tipo de Servicio",
      accessor: "project.serviceType.label",
    },
    {
      id: "actions",
      Header: "Acciones",
      Cell: ({ row }) => (
        <Link
          href={`/estimates/${row.original.id}/edit`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          <Tooltip title="Editar" placement="top">
            <EditIcon fontSize="medium" color="warning" />
          </Tooltip>
        </Link>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href="/estimates/create">
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Proforma
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
    </MDBox>
  );
}
