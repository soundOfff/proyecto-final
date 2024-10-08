"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import Modal from "/components/Modal";

import numberFormat from "/utils/numberFormat";
import { Link, Tooltip } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Form from "./form/form";
import { getColor } from "/utils/project-state-colors";

export default function Table({ rows, project }) {
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const columns = [
    {
      Header: "Fecha",
      accessor: "start_date",
      align: "left",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDTypography variant="body2" fontSize="small">
          {moment(row.original.start_date).format("DD/MM/YYYY")}
        </MDTypography>
      ),
    },
    {
      Header: "Hora de inicio",
      accessor: "start_time",
      disableSortBy: true,
      width: 200,
      Cell: ({ row }) => {
        return row.original.timers.map((timer) => (
          <MDTypography key={timer.id} variant="body2" fontSize="small">
            {moment(timer.start_time).format("DD-MM HH:mm:SS")}
          </MDTypography>
        ));
      },
    },
    {
      Header: "Hora de Fin",
      accessor: "end_time",
      disableSortBy: true,
      width: 200,
      Cell: ({ row }) => {
        return row.original.timers.map((timer) => (
          <MDBox key={timer.id} container>
            <MDTypography variant="body2" fontSize="small">
              {timer.end_time
                ? moment(timer.end_time).format("DD-MM HH:mm:SS")
                : "Sin finalizar"}
            </MDTypography>
          </MDBox>
        ));
      },
    },
    {
      Header: "Miembros del equipo",
      accessor: "staff",
      disableSortBy: true,
      Cell: ({ row }) => {
        const assigneds = row.original.assigneds;
        if (assigneds.length === 0 || !assigneds) {
          return (
            <MDTypography variant="body2" fontSize="small">
              Sin responsables
            </MDTypography>
          );
        }
        return assigneds.map((assigned) => (
          <MDTypography key={assigned.id} variant="body2" fontSize="small">
            {assigned.name}
          </MDTypography>
        ));
      },
    },
    {
      Header: "Tarea",
      accessor: "name",
      Cell: ({ row }) => (
        <MDBox display="flex" flexDirection="row" alignItems="center">
          <Link href={`/tasks?taskId=${row.original.id}`}>
            {row.original.name}
          </Link>
          <MDBadge
            variant="contained"
            color={getColor(row.original.status.id)}
            size="md"
            badgeContent={row.original.status.name}
          />
        </MDBox>
      ),
    },
    {
      Header: "Nota",
      accessor: "note",
      disableSortBy: true,
      Cell: ({ row }) => {
        return row.original.timers.length
          ? row.original.timers[0].note
          : "Sin notas";
      },
    },
    {
      Header: "Tiempo total",
      accessor: "total_time",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDTypography variant="body2" color="dark" fontSize="small">
          {numberFormat(row.original.total_time)} hs
        </MDTypography>
      ),
    },
  ];
  const table = { columns, rows };

  return (
    <MDBox>
      <Modal
        open={open}
        width="50%"
        height="min-content"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Form
          taskId={taskId}
          project={project}
          onClose={() => setOpen(false)}
        />
      </Modal>
      <DataTable
        table={table}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
