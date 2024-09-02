"use client";

import moment from "moment";
import numberFormat from "/utils/numberFormat";
import Link from "next/link";
import DataTable from "/examples/Tables/DataTable";

import MDBox from "/components/MDBox";
import MDAvatar from "/components/MDAvatar";
import MDTypography from "/components/MDTypography";
import { Tab, Tabs } from "@mui/material";

import MaterialLink from "@mui/material/Link";
import MDBadge from "/components/MDBadge";
import { setColor } from "/utils/project-state-colors";
import Loading from "./skeleton";
import useTabs from "/hooks/useTabs";
import { getPriorityColor } from "/utils/project-state-colors";

const TAB_TYPES = [
  {
    tabIndex: 0,
    label: "Mis tareas",
    value: "myTasks",
  },
  {
    tabIndex: 1,
    label: "Mis casos",
    value: "myProjects",
  },
];

export default function Table({ rows, meta }) {
  const { isLoading, handleChange, selectedTab } = useTabs({
    TAB_TYPES,
  });

  const projectColumns = [
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ value, row }) => {
        return (
          <MaterialLink href={`/projects/${row.original.id}`} color="info">
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
      width: "20%",
    },
    {
      Header: "Horas estimadas",
      accessor: "estimatedHours",
    },
    {
      Header: "Comienzo del caso",
      accessor: "startDate",
    },
    {
      Header: "Fin del caso",
      accessor: "dateFinished",
    },
    {
      Header: "Última Nota",
      accessor: "notes",
      Cell: ({ value }) => {
        return value?.length > 0 ? value.at(-1).content : null;
      },
    },
  ];

  const taskColumns = [
    {
      Header: "Fecha",
      accessor: "start_date",
      Cell: ({ row }) => (
        <MDTypography variant="body2" fontSize="small">
          {moment(row.original.start_date).format("DD/MM/YYYY")}
        </MDTypography>
      ),
    },
    {
      Header: "Nro del caso",
      accessor: "",
      Cell: ({ row }) => (
        <MDTypography
          variant="body2"
          fontSize="small"
          sx={{ textAlign: "center" }}
        >
          {row.original.taskable?.id}
        </MDTypography>
      ),
    },
    {
      Header: "Cliente",
      accessor: "partner",
      Cell: ({ row }) => {
        return (
          <Link
            href={`partners/${row.original.partner?.id}/profile`}
            color="info"
          >
            {row.original.partner?.company}
          </Link>
        );
      },
    },
    {
      Header: "Caso",
      accessor: "taskable",
      width: "15%",
      Cell: ({ row }) => (
        <Link href={`projects/${row.original?.taskable?.id}`} color="info">
          {row.original.taskable?.name}
        </Link>
      ),
    },
    {
      Header: "Tarea",
      accessor: "name",
      Cell: ({ row }) => {
        return (
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
        );
      },
    },
    {
      Header: "Nota",
      accessor: "note",
      Cell: ({ row }) => {
        return row.original.timers?.length
          ? row.original.timers[0]?.note
          : "Sin notas";
      },
    },
    {
      Header: "Prioridad",
      accessor: "priority",
      Cell: ({ row }) => {
        return (
          <MDBadge
            variant="contained"
            color={getPriorityColor(row.original.priority.name)}
            size="md"
            badgeContent={row.original.priority.name}
          />
        );
      },
    },
    /* {
      Header: "Hora de inicio",
      accessor: "start_time",
      width: 200,
      Cell: ({ row }) => {
        return row.original.timers?.map((timer) => (
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
        return row.original.timers?.map((timer) => (
          <MDBox key={timer.id} container>
            <MDTypography variant="body2" fontSize="small">
              {timer.end_time
                ? moment(timer.end_time).format("DD-MM HH:mm:SS")
                : "Sin finalizar"}
            </MDTypography>
          </MDBox>
        ));
      },
    }, */
    {
      Header: "Tiempo total",
      accessor: "parsed_total_time",
      Cell: ({ row }) => (
        <MDTypography variant="body2" color="dark">
          {row.original.parsed_total_time}
        </MDTypography>
      ),
    },
  ];

  const table = {
    columns: selectedTab ? projectColumns : taskColumns,
    rows,
  };

  return (
    <>
      <MDBox py={2} px={2}>
        <Tabs value={selectedTab} centered onChange={handleChange}>
          {TAB_TYPES.map((tab) => (
            <Tab key={tab.tabIndex} label={tab.label} />
          ))}
        </Tabs>
      </MDBox>
      <MDBox py={2} px={2}>
        {isLoading ? (
          <Loading count={table.rows?.length > 3 ? 5 : 3} />
        ) : (
          <DataTable
            table={table}
            meta={meta}
            showTotalEntries={true}
            isSorted={true}
            noEndBorder
          />
        )}
      </MDBox>
    </>
  );
}
