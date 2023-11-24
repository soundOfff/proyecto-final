"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";
import ModalContent from "./modal-content";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";
import MDBadge from "/components/MDBadge";

import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import Tooltip from "@mui/material/Tooltip";

import { useEffect, useState } from "react";
import { show, destroy } from "/actions/projects";

import { setColor } from "/utils/project-state-colors";

export default function Table({ rows }) {
  const [projectIdShow, setProjectIdShow] = useState(0);
  const [projectIdDelete, setProjectIdDelete] = useState(0);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setProject(await show(projectIdShow, { include: "staffs" }));
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
    { Header: "Expediente", accessor: "expedient" },
    { Header: "Nombre", accessor: "name" },
    { Header: "Cliente", accessor: "responsiblePerson.firstName" },
    { Header: "Demandante", accessor: "plaintiff.company" },
    { Header: "Demandado", accessor: "defendant.company" },
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
    { Header: "Acciones", accessor: "actions", textAlign: "center" },
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
        title="Proyecto Eliminado"
        content="Se ha eliminado el proyecto correctamente"
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
