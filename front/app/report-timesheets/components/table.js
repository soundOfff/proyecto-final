"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

import numberFormat from "/utils/numberFormat";
import { Link } from "@mui/material";
import moment from "moment";

export default function Table({ rows, meta }) {
  const columns = [
    {
      Header: "Cliente",
      accessor: "partner",
      Cell: ({ row }) => {
        return (
          <Link
            href={`partners/${row.original.partner.id}/profile`}
            color="info"
          >
            {row.original.partner.company}
          </Link>
        );
      },
    },
    {
      Header: "Caso",
      accessor: "taskable",
      disableSortBy: true,
      Cell: ({ row }) =>
        row.original.taskable && row.original.taskable_type === "project" ? (
          <Link href={`projects/${row.original.taskable.id}`} color="info">
            {row.original.taskable.name + " - #" + row.original.taskable.id}
          </Link>
        ) : (
          <MDTypography variant="body2" fontSize="small">
            No hay caso relacionado
          </MDTypography>
        ),
    },
    {
      Header: "Miembros del equipo",
      accessor: "staff",
      disableSortBy: true,
      Cell: ({ row }) => {
        const assigneds = row.original.assigneds;
        if (assigneds.length === 0 || !assigneds) {
          return (
            <MDTypography color="info" variant="body2" fontSize="small">
              Sin asignar
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
            variant="gradient"
            color="primary"
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
      Header: "Fecha",
      accessor: "start_date",
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
      <DataTable
        table={table}
        meta={meta}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
    </MDBox>
  );
}
