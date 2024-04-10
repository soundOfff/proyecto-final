"use client";

import Link from "next/link";
import MaterialLink from "@mui/material/Link";
import DataTable from "/examples/Tables/DataTable";
import ModalContent from "./modal-content";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDSnackbar from "/components/MDSnackbar";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";

import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Tooltip } from "@mui/material";

import { useEffect, useState } from "react";
import { show, destroy } from "/actions/projects";
import { destroy as destroyFile } from "/actions/files";

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

  const handleDeleteFile = async (fileId) => {
    await destroyFile(fileId);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ value, row }) => {
        return (
          <MaterialLink href={`projects/${row.original.id}`} color="info">
            {value}
          </MaterialLink>
        );
      },
      width: "30%",
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
      width: "15%",
    },
    {
      Header: "Última Nota",
      accessor: "notes",
      Cell: ({ value }) => {
        return value.length > 0 ? value.at(-1).content : null;
      },
      width: "40%",
    },
    {
      Header: "Archivos",
      accessor: "files",
      width: "20%",
      textAlign: "center",
      Cell: ({ row }) => {
        return (
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ gap: 1, width: "100%" }}
          >
            {row.original.files.map((file) => (
              <MDBox
                key={file.id}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="between"
                p={0.75}
                sx={{
                  border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                  gap: 1,
                }}
              >
                <DescriptionOutlined fontSize="medium" color="dark" />
                <Link href={file.publicUrl}>
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                  >
                    {file.subject.length > 10
                      ? file.subject.substring(0, 10) + "..."
                      : file.subject}
                  </MDTypography>
                </Link>
                <CancelIcon
                  color="error"
                  onClick={() => handleDeleteFile(file.id)}
                  sx={{ cursor: "pointer" }}
                />
              </MDBox>
            ))}
          </MDBox>
        );
      },
    },
    {
      Header: "Acciones",
      accessor: "actions",
      textAlign: "center",
      Cell: ({ row }) => (
        <>
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
          <Link href={`/projects/${row.original.id}/edit`}>
            <Tooltip title="Editar">
              <EditIcon
                color="secondary"
                fontSize="medium"
                sx={{ mr: 3, cursor: "pointer" }}
              />
            </Tooltip>
          </Link>
          <Link href={`/projects/create-notes/${row.original.id}`}>
            <Tooltip title="Agregar Notas">
              <EditNoteIcon
                color="warning"
                fontSize="medium"
                sx={{ mr: 3, cursor: "pointer" }}
              />
            </Tooltip>
          </Link>
          <Tooltip title="Eliminar">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                setProjectIdDelete(row.original.id);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Link href={`/projects/create-expenses/${row.original.id}`}>
            <Tooltip title="Registrar Gasto">
              <DescriptionOutlinedIcon
                color="success"
                fontSize="medium"
                sx={{ mr: 3, cursor: "pointer" }}
              />
            </Tooltip>
          </Link>
        </>
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
