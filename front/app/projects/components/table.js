"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";

import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Tooltip } from "@mui/material";

import { useEffect, useState } from "react";
import { show, destroy } from "/actions/projects";

import { setColor } from "/utils/project-state-colors";

import Detail from "./detail";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";

export default function Table({ rows }) {
  const [projectIdShow, setProjectIdShow] = useState(0);
  const [project, setProject] = useState(null);
  const [openShow, setOpenShow] = useState(false);
  const {
    openDeleteConfirmation,
    errorSB,
    handleDelete,
    setDeleteConfirmed,
    setOpenDeleteConfirmation,
    setErrorSB,
  } = useDeleteRow(destroy);

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

  const handleShow = (row) => {
    setProjectIdShow(row.original.id);
    setOpenShow(true);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
      width: "30%",
      Cell: ({ value, row }) => {
        return (
          <MDBox display="flex">
            <Link href={`projects/${row.original.id}`} color="info">
              {value}
            </Link>
          </MDBox>
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
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Vista Rápida">
            <FlashOnIcon
              color="info"
              fontSize="medium"
              onClick={() => handleShow(row)}
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
              onClick={() => handleDelete(row.original.id)}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>
          <Link
            href={{
              pathname: `/expenses/create`,
              query: {
                projectId: row.original.id,
                partnerId: row.original.defendant.id,
              },
            }}
          >
            <Tooltip title="Registrar Gasto">
              <DescriptionOutlinedIcon
                color="success"
                fontSize="medium"
                sx={{ mr: 3, cursor: "pointer" }}
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
          open={openShow}
          onClose={() => {
            setOpenShow(false);
          }}
        >
          <Detail project={project} />
        </Modal>
      )}
      <DataTable
        table={table}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
