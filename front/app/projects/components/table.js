"use client";

import Link from "next/link";
import DataTable from "/examples/Tables/DataTableServerPagination";
import Modal from "/components/Modal";
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";

import EditNoteIcon from "@mui/icons-material/EditNote";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Tooltip } from "@mui/material";

import { useEffect, useState } from "react";
import { show } from "/actions/projects";

import { setColor } from "/utils/project-state-colors";

import Detail from "./detail";

export default function Table({ rows, meta }) {
  const [projectIdShow, setProjectIdShow] = useState(0);
  const [project, setProject] = useState(null);
  const [openShow, setOpenShow] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setProject(
        await show(projectIdShow, {
          include: [
            "staffs",
            "billablePartner",
            "billingType",
            "serviceType",
            "members",
            "responsiblePerson",
            "partners",
            "proposal",
          ],
        })
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
        return value.length > 0 ? (
          <MDTypography
            dangerouslySetInnerHTML={{ __html: value.at(-1).content }}
            fontSize="small"
          ></MDTypography>
        ) : null;
      },
    },
    {
      Header: "Acciones",
      accessor: "actions",
      textAlign: "center",
      width: "10%",
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
          <Link href={`/projects/create-notes/${row.original.id}`}>
            <Tooltip title="Agregar Notas">
              <EditNoteIcon
                color="warning"
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
        meta={meta}
        entriesPerPage={false}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
