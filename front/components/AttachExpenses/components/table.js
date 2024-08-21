"use client";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import numberFormat from "/utils/numberFormat";
import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";
import { Checkbox } from "@mui/material";
export default function TableComponent({
  rows,
  formData,
  setSelectedExpenses,
}) {
  const { values, setFieldValue } = formData;

  const columns = [
    {
      id: "checkbox",
      header: "",
      width: "30px",
      Cell: ({ row }) => (
        <Checkbox
          name="expenses"
          defaultChecked={values.expenses.includes(row.original.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setFieldValue("expenses", [...values.expenses, row.original.id]);
              setSelectedExpenses((prev) => [...prev, row.original]);
            } else {
              setFieldValue(
                "expenses",
                values.expenses.filter((id) => id != row.original.id)
              );
              setSelectedExpenses((prev) =>
                prev.filter((id) => id != row.original)
              );
            }
          }}
        />
      ),
    },
    {
      accessor: "name",
      header: "Nombre",
      Cell: ({ row }) => (
        <Link href={`/expenses/${row.original.id}`}>{row.original.name}</Link>
      ),
    },
    {
      accessor: "date",
      header: "Fecha",
    },
    {
      accessor: "amount",
      header: "Importe",
      Cell: ({ value }) => <>${numberFormat(value)}</>,
    },
  ];

  const table = { columns, rows };

  return (
    <DataTable
      table={table}
      entriesPerPage={false}
      showTotalEntries={true}
      isSorted={false}
      noEndBorder
    />
  );
}
