"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";

import { Switch } from "@mui/material";

export default function Table({ rows }) {
  const columns = [
    { Header: "#", accessor: "id" },
    { Header: "Empresa", accessor: "company" },
    {
      id: "contactName",
      Header: "Contacto Principal",
      accessor: "user.contacts",
      Cell: ({ value }) => {
        return value && value.length
          ? `${value.at(0).firstName} ${value.at(0).lastName}`
          : null;
      },
    },
    {
      id: "contactEmail",
      Header: "Email principal",
      accessor: "user.contacts",
      Cell: ({ value }) => {
        return value && value.length ? value.at(0).email : null;
      },
    },
    { Header: "Teléfono", accessor: "phoneNumber" },
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ value }) => {
        const label = { inputProps: { "aria-label": "Is active switch" } };
        return <Switch {...label} checked={Boolean(value)} />;
      },
    },
    { id: "clientType", Header: "Tipo de Cliente", accessor: "" },
    { Header: "Fecha de Creación", accessor: "createdAt" },
    { id: "industry", Header: "Industria", accessor: "" },
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
