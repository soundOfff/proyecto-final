"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import moneyFormat from "/utils/moneyFormat";
import Link from "next/link";

export default function Table({ rows }) {
  const columns = [
    {
      Header: "id",
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
      id: "partner",
      Header: "Nombre",
      accessor: "partner.company",
      Cell: ({ row }) => (
        <Link
          href={`/partners/${row.original.id}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.partner?.company ?? row.original.partner?.name}
        </Link>
      ),
    },
    {
      Header: "Fecha",
      accessor: "date",
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
      Header: "Fecha De Caducidad",
      accessor: "dueDate",
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
    </MDBox>
  );
}
