"use client";

import Link from "next/link";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";
import ModalContent from "./modal-content";
import Modal from "/components/Modal";

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
          <MDButton
            variant="text"
            color="dark"
            onClick={() => {
              setProjectId(project.id);
              setOpen(true);
            }}
          >
            Ver
          </MDButton>
          <Link key={project.id} href={`/projects2/create-notes/${project.id}`}>
            <MDButton variant="text" color="dark">
              Agregar Notas
            </MDButton>
          </Link>
        </>
      ),
    };
  });

  const dataTableData = { columns, rows };

  return (
    <>
      {project && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setProject(null);
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
    </>
  );
}
