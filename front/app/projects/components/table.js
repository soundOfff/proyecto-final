"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";
import ModalContent from "./modal-content";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";
import MDTypography from "/components/MDTypography";

import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import ResponsiveTableContent from "./responsive-table-content";

import { useEffect, useState } from "react";
import { getOne, destroy } from "/actions/projects";
import { Grid } from "@mui/material";

export default function Table({ columns, rows }) {
  const [projectIdShow, setProjectIdShow] = useState(0);
  const [projectIdDelete, setProjectIdDelete] = useState(0);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setProject(await getOne(projectIdShow, { include: "staffs" }));
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

  rows = rows.map((project) => {
    return {
      ...project,
      actions: (
        <>
          <Tooltip title="Ver">
            <VisibilityIcon
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

  const desktop = { columns, rows };
  const mobile = {
    columns: [
      {
        Header: "",
        accessor: "mobile",
        width: "100%",
        Cell: (props) => {
          return <ResponsiveTableContent props={props} />;
        },
      },
    ],
    rows,
  };

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
        className="desktop"
        table={desktop}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
      <DataTable
        className="mobile"
        table={mobile}
        entriesPerPage={false}
        isSorted={false}
        showTotalEntries={true}
        noEndBorder
      />
    </MDBox>
  );
}
