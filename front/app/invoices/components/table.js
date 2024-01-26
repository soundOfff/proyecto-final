"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";

export default function Table({ rows, meta }) {
  const columns = [
    {
      Header: "Factura #",
      accessor: "id",
      Cell: ({ row }) => (
        <Link
          href={`/invoices/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.number}
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
      Header: "Proforma",
      accessor: "estimate",
      Cell: ({ value }) =>
        value ? (
          <Link href={`/estimates/${value.id}`}>{value.number}</Link>
        ) : null,
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
