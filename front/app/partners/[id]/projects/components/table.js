"use client";

import Link from "next/link";
import MaterialLink from "@mui/material/Link";
import DataTable from "/examples/Tables/DataTable";
import ModalContent from "./modal-content";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";
import MDBadge from "/components/MDBadge";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import Tooltip from "@mui/material/Tooltip";

import { useEffect, useState } from "react";
import { show, destroy } from "/actions/projects";

import { setColor } from "/utils/project-state-colors";
import { DescriptionOutlined } from "@mui/icons-material";

export default function Table({ rows }) {
  const [projectIdShow, setProjectIdShow] = useState(0);
  const [projectIdDelete, setProjectIdDelete] = useState(0);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setProject(
        await show(projectIdShow, { include: ["staffs", "defendant"] })
      );
    };
    if (projectIdShow) {
      fetchProject();
    }
  }, [projectIdShow]);

  useEffect(() => {
    const deleteProject = async () => {
      await destroy(projectIdDelete);
      setErrorSB(true);
    };
    if (projectIdDelete) {
      deleteProject();
    }
  }, [projectIdDelete]);

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ value, row }) => {
        return (
          <MaterialLink href={`/projects/${row.original.id}`} color="info">
            {value}
          </MaterialLink>
        );
      },
    },
    {
      Header: "Estado",
      accessor: "status.label",
      textAlign: "center",
      Cell: ({ value }) => {
        return (
          <MDBadge
            variant="contained"
            badgeContent={value}
            color={setColor(value)}
            size="xs"
            container
            sx={{ ml: 1, height: "2rem" }}
          />
        );
      },
    },
    {
      Header: "Última Nota",
      accessor: "notes",
      Cell: ({ value }) => {
        return value.length > 0 ? value.at(-1).content : null;
      },
    },
    {
      Header: "Acciones",
      accessor: "actions",
      textAlign: "center",
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Vista Rápida">
            <FlashOnIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setProjectIdShow(row.original.id);
                setOpen(true);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Link
            key={row.original.id}
            href={`/projects/create-notes/${row.original.id}`}
          >
            <Tooltip title="Agregar Notas">
              <EditNoteIcon color="warning" fontSize="medium" />
            </Tooltip>
          </Link>
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                setProjectIdDelete(row.original.id);
              }}
              sx={{ ml: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Link href={`/projects/create-expenses/${row.original.id}`}>
            <Tooltip title="Registrar Gasto">
              <DescriptionOutlined
                color="success"
                fontSize="medium"
                sx={{ ml: 3, cursor: "pointer" }}
              />
            </Tooltip>
          </Link>
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows };

  return (
    <MDBox>
      {project && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ModalContent project={project} />
        </Modal>
      )}
      <MDSnackbar
        color="error"
        icon="warning"
        title="Caso Eliminado"
        content="Se ha eliminado el caso correctamente"
        open={errorSB}
        onClose={() => setErrorSB(false)}
        close={() => setErrorSB(false)}
        bgWhite
      />
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
