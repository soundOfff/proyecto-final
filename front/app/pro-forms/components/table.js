"use client";
import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";
import { useMaterialUIController } from "/context";

export default function Table({ rows }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const columns = [
    {
      Header: "Proforma #",
      accessor: "id",
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
      Header: "Nombre",
      accessor: "partner.company",
      Cell: ({ row }) => (
        <Link
          href={`/partners/${row.original.id}`}
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
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href="/expenses/create">
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Proforma
          </MDButton>
        </Link>
      </MDBox>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
