"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

export default function Table({ rows, meta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    searchParams.get("type") === "myProjects" ? 1 : 0
  );

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
      Header: "Miembros del equipo",
      accessor: "staff",
      Cell: ({ row }) => {
        return row.original.assigneds?.map((member) => (
          <MDBox key={member.id} display="inline-block" mr={2}>
            {member.profileImage && (
              <MDAvatar
                src={member?.profileImage}
                alt="profile-image"
                size="md"
                shadow="sm"
                sx={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  height: "2rem",
                  width: "2rem",
                }}
              />
            )}
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              mr={2}
            >
              {member.name}
            </MDTypography>
          </MDBox>
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
        return row.original.timers?.length
          ? row.original.timers[0]?.note
          : "Sin notas";
      },
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
      Header: "Relacionado",
      accessor: "taskable",
      Cell: ({ row }) => (
        <Link href={`projects/${row.original?.taskable?.id}`} color="info">
          {row.original.taskable?.name}
        </Link>
      ),
    },
    {
      Header: "Nro del caso",
      accessor: "",
      Cell: ({ row }) => (
        <MDTypography
          variant="body2"
          fontSize="medium"
          sx={{ textAlign: "center" }}
        >
          {row.original.taskable?.id}
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

  const table = {
    columns:
      selectedTab === 0 // TODO: improve this
        ? taskColumns
        : projectColumns,
    rows,
  };

  const handleChange = (_, newValue) => {
    setIsLoading(true);
    setSelectedTab(newValue);
    setTimeout(() => {
      // TODO: get a better solution
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (selectedTab !== undefined) {
      const tab = TAB_TYPES.find((tab) => tab.tabIndex === selectedTab);
      params.set("type", tab.value);
    } else {
      params.delete("type");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [selectedTab, router, pathname, searchParams]);

  return (
    <>
      <MDBox py={2} px={2}>
        <Tabs value={selectedTab} centered onChange={handleChange}>
          {TAB_TYPES.map((tab) => (
            <Tab key={tab.tabIndex} label={tab.label} />
          ))}
        </Tabs>
      </MDBox>
      <MDBox>
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
