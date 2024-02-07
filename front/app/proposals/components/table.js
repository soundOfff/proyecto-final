"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDButton from "/components/MDButton";
import numberFormat from "/utils/numberFormat";
import Link from "next/link";
import { useMaterialUIController } from "/context";

export default function Table({ rows, meta }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const columns = [
    {
      Header: "Propuesta #",
      accessor: "id",
      Cell: ({ value }) => (
        <Link
          href={`/proposals/${value}`}
          sx={{ cursor: "pointer", color: "info" }}
        >
          {value}
        </Link>
      ),
    },
    {
      Header: "Tema",
      accessor: "subject",
    },
    {
      Header: "Para",
      accessor: "proposable",
      Cell: ({ value }) => {
        return value && value.company ? (
          <Link
            href={`/partners/${value.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {value.company}
          </Link>
        ) : null;
      },
    },
    {
      Header: "Total",
      accessor: "total",
      Cell: ({ value }) => `$${numberFormat(value)}`,
    },
    {
      Header: "Fecha",
      accessor: "date",
    },
    {
      Header: "Válida Hasta",
      accessor: "openTill",
    },
    {
      Header: "Etiquetas",
      accessor: "tags",
      Cell: ({ value }) =>
        value.length
          ? value.map((tag) => <MDBadge key={tag.id}>{tag.label}</MDBadge>)
          : null,
    },
    {
      Header: "Fecha de creación",
      accessor: "createdAt",
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ value }) => value.label,
    },
    {
      Header: "Comentarios",
      accessor: "comments",
      Cell: ({ value }) =>
        value.length
          ? value.map((comment) => comment.content).join(", ")
          : null,
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <Link href="/proposals/create">
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Registrar Propuesta
          </MDButton>
        </Link>
      </MDBox>
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
