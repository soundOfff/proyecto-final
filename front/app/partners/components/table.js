"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";
import MDBadge from "/components/MDBadge";

import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import Tooltip from "@mui/material/Tooltip";

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
        return value.length > 0
          ? `${value.at(0).firstName} ${value.at(0).lastName}`
          : null;
      },
    },
    {
      id: "contactEmail",
      Header: "Email principal",
      accessor: "user.contacts",
      Cell: ({ value }) => {
        return value.length > 0 ? value.at(0).email : null;
      },
    },
    { Header: "Teléfono", accessor: "phoneNumber" },
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ value }) => {
        const label = { inputProps: { "aria-label": "Is active switch" } };
        return <Switch {...label} checked={value} />;
      },
    },
    // { Header: "Tipo de Cliente", accessor: "" },
    { Header: "Fecha de Creación", accessor: "createdAt" },
    { Header: "Industria", accessor: "" },
  ];

  rows = rows.map((project) => {
    return {
      ...project,
      actions: (
        <>
          <Tooltip title="Ver Detalles">
            <Link key={project.id} href={`/projects/${project.id}`}>
              <VisibilityIcon color="dark" fontSize="medium" sx={{ mr: 2 }} />
            </Link>
          </Tooltip>
          <Tooltip title="Vista Rápida">
            <PreviewIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setProjectIdShow(project.id);
                setOpen(true);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Link key={project.id} href={`/projects/create-notes/${project.id}`}>
            <Tooltip title="Agregar Notas">
              <EditNoteIcon color="warning" fontSize="medium" />
            </Tooltip>
          </Link>
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                setProjectIdDelete(project.id);
              }}
              sx={{ ml: 3, cursor: "pointer" }}
            />
          </Tooltip>
        </>
      ),
    };
  });

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
