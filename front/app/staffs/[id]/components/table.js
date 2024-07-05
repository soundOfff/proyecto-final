"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";
import { setColor } from "/utils/project-state-colors";
import Link from "next/link";

export default function Table({ projects = [] }) {
  const columns = [
    {
      Header: "Nombre del caso",
      accessor: "name",
      width: "50%",
      Cell: ({ row }) => (
        <Link href={`/projects/${row.original.id}`}>
          <MDBox display="flex" alignItems="center" color="info">
            {row.original.name}
          </MDBox>
        </Link>
      ),
    },
    {
      Header: "Fecha de inicio",
      accessor: "startDate",
      Cell: ({ row }) => (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          {row.original.startDate}
        </MDBox>
      ),
    },
    {
      Header: "Fecha de fin",
      accessor: "endDate",
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ row }) => (
        <MDBox display="flex" alignItems="center">
          <MDBadge
            variant="contained"
            badgeContent={row.original.status.label}
            color={setColor(row.original.status.label)}
            size="xs"
            container
            sx={{ ml: 1, height: "2rem" }}
          />
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows: projects };

  return (
    <MDBox>
      <MDTypography variant="h5" gutterBottom>
        Casos
      </MDTypography>
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={false}
        noEndBorder
      />
    </MDBox>
  );
}
