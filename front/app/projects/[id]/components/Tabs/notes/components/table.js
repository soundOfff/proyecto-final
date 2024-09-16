"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import moment from "moment";

export default function Table({ rows }) {
  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Creada por",
      accessor: "createdBy",
      Cell: ({ row }) => (
        <MDTypography variant="body3" color="dark">
          {row.original.staff?.name}
        </MDTypography>
      ),
    },
    {
      Header: "Contenido",
      accessor: "content",
      width: "60%",
      Cell: ({ value }) => (
        <MDTypography variant="body3" color="text">
          {value}
        </MDTypography>
      ),
    },
    {
      Header: "Fecha de creación",
      accessor: "created_at",
      Cell: ({ value }) => (
        <MDBox ml={3}>
          <MDTypography variant="body3" color="dark">
            {moment(value).format("YYYY-MM-DD")}
          </MDTypography>
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
    </MDBox>
  );
}
