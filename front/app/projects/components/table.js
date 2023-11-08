"use client";

import Link from "next/link";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";
import ModalContent from "./modal-content";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";

import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

import { useEffect, useState } from "react";
import { getOne } from "/actions/projects";

export default function Table({ columns, rows }) {
  const [projectId, setProjectId] = useState(0);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setProject(await getOne(projectId, { include: "staffs" }));
    };
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  rows = rows.map((project) => {
    return {
      ...project,
      actions: (
        <>
          <Tooltip title="Ver">
            <VisibilityIcon
              color="dark"
              fontSize="large"
              onClick={() => {
                setProjectId(project.id);
                setOpen(true);
              }}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          </Tooltip>

          <Link key={project.id} href={`/projects/create-notes/${project.id}`}>
            <Tooltip title="Agregar Notas">
              <EditNoteIcon color="dark" fontSize="large" />
            </Tooltip>
          </Link>
        </>
      ),
    };
  });

  const dataTableData = { columns, rows };

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
      <DataTable
        table={dataTableData}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
