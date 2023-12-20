"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import moneyFormat from "/utils/moneyFormat";

export default function Table({ rows }) {
  const columns = [
    {
      Header: "Categoría",
      accessor: "category.name",
    },
    {
      Header: "Importe",
      accessor: "amount",
      Cell: ({ value }) => moneyFormat(value),
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Caso",
      accessor: "project.name",
    },
    {
      Header: "Cliente",
      accessor: "user",
      Cell: ({ value }) => (value.partners ? value.partners[0]?.company : null),
    },
    {
      Header: "Factura",
      accessor: "invoice.id",
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
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
