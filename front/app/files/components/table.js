"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import Link from "next/link";

export default function Table({ rows, meta }) {
  const getFileableUrl = (row) => {
    switch (row.original.fileableType) {
      case "project":
        return `/projects/${row.original.fileableId}`;
      case "customer":
        return `/partners/${row.original.fileableId}`;
      default:
        return "/";
    }
  };

  const columns = [
    {
      id: "url",
      Header: "URL",
      accessor: "publicUrl",
      Cell: ({ value }) => (
        <Link href={value} sx={{ cursor: "pointer", color: "info" }}>
          {value}
        </Link>
      ),
    },
    {
      id: "fileable",
      Header: "Relacionado con",
      Cell: ({ row }) => (
        <Link
          href={getFileableUrl(row)}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {row.original.fileableType}: {row.original.fileableId}
        </Link>
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
      />
    </MDBox>
  );
}
