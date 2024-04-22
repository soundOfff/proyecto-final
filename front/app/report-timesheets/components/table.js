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
      Header: "Miembros del equipo",
      accessor: "staff",
      Cell: ({ row }) => {
        const assigneds = row.original.assigneds;
        if (assigneds.length === 0 || !assigneds) {
          return (
            <MDTypography color="info" variant="body2">
              Sin asignar
            </MDTypography>
          );
        }
        return assigneds.map((assigned) => (
          <MDTypography key={assigned.id} variant="body2">
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
      Cell: ({ row }) => {
        return row.original.timers.length
          ? row.original.timers[0].note
          : "Sin notas";
      },
    },
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
      Header: "Relacionado",
      accessor: "taskable",
      Cell: ({ row }) => (
        <Link href={`projects/${row.original.taskable.id}`} color="info">
          {row.original.taskable.name}
        </Link>
      ),
    },
    {
      Header: "Nro del caso",
      accessor: "",
      Cell: ({ row }) => (
        <MDTypography variant="body2" fontSize="medium">
          {row.original.taskable.id}
        </MDTypography>
      ),
    },
    {
      Header: "Fecha",
      accessor: "start_date",
      Cell: ({ row }) => (
        <MDTypography variant="body2" fontSize="medium">
          {moment(row.original.start_date).format("DD/MM/YYYY")}
        </MDTypography>
      ),
    },
    {
      Header: "Hora de inicio",
      accessor: "start_time",
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
      Cell: ({ row }) => (
        <MDTypography variant="body2" color="dark">
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
