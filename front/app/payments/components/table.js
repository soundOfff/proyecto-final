"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function Table({ rows }) {
  const columns = [
    {
      Header: "Cobro nº",
      accessor: "id",
      width: "10%",
    },
    {
      Header: "Facturas relacionadas",
      accessor: "invoces",
      Cell: ({ row }) => (
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          {row.original.invoices && row.original.invoices.length > 0 ? (
            row.original.invoices.map((invoice) => (
              <MDBox key={invoice.id}>
                <Link href={`/invoices/${invoice.id}`}>
                  <MDTypography variant="button" fontWeight="regular">
                    {invoice.number}
                  </MDTypography>
                </Link>
              </MDBox>
            ))
          ) : (
            <MDTypography variant="button" fontWeight="regular" color="text">
              Sin facturas relacionadas
            </MDTypography>
          )}
        </MDBox>
      ),
    },
    {
      Header: "Modo de cobro",
      accessor: "paymentMethod.name",
      Cell: ({ row }) => (
        <MDTypography
          variant="button"
          display="flex"
          justifyContent="center"
          fontWeight="regular"
        >
          {row.original.paymentMethod.name.toUpperCase()}
        </MDTypography>
      ),
      width: "10%",
    },
    {
      Header: "ID de la transaccion",
      accessor: "transactionId",
    },
    {
      Header: "Cliente",
      accessor: "partner.name",
      Cell: ({ row }) => (
        <Link href={`/partners/${row.original.partner.id}`}>
          <MDTypography variant="button" fontWeight="regular" color="dark">
            {row.original.partner.company}
          </MDTypography>
        </Link>
      ),
    },
    {
      Header: "Monto",
      accessor: "amount",
    },
    {
      Header: "Fecha",
      accessor: "createdAt",
    },
  ];

  const table = { columns, rows };
  return (
    <MDBox>
      <DataTable
        table={table}
        showTotalEntries={true}
        isSorted={true}
        entriesPerPage={false}
        noEndBorder
      />
    </MDBox>
  );
}
