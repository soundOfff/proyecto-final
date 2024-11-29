"use client";

import numberFormat from "/utils/numberFormat";
import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";
import { Checkbox } from "@mui/material";
export default function TableComponent({ rows, formData, setSelectedTasks }) {
  const { values, setFieldValue } = formData;

  const columns = [
    {
      id: "checkbox",
      header: "",
      width: "30px",
      Cell: ({ row }) => (
        <Checkbox
          name="tasks"
          defaultChecked={values.tasks.includes(row.original.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setFieldValue("tasks", [...values.tasks, row.original.id]);
              setSelectedTasks((prev) => [...prev, row.original]);
            } else {
              setFieldValue(
                "tasks",
                values.tasks.filter((id) => id != row.original.id)
              );
              setSelectedTasks((prev) =>
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
        <Link href={`/tasks/${row.original.id}`}>{row.original.name}</Link>
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
