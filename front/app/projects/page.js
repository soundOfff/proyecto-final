// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { getAll as getAllProjects } from "/actions/projects";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getCountByStatuses } from "/actions/projects";

import Table from "./components/table";
import Filters from "./components/filters";
import Stats from "./components/stats";

const include = [
  "stages",
  "notes",
  "status",
  "jurisdiction",
  "defendant",
  "plaintiff",
  "responsiblePerson",
  "lawFirm",
  "staffs",
];

export const dynamic = "force-dynamic";

export default async function Projects({ searchParams }) {
  const { statusId, search } = searchParams;

  const statusFilter = statusId ? { "filter[status]": statusId } : null;
  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...statusFilter,
    ...searchFilter,
  };

  const projects = await getAllProjects(params);
  const statuses = await getAllStatuses();
  const countByStatuses = await getCountByStatuses();

  const { t, lang } = useTranslation("common");

  const columns = [
    { Header: "Expediente", accessor: "expedient" },
    { Header: "Nombre", accessor: "name" },
    { Header: "Cliente", accessor: "responsiblePerson.firstName" },
    { Header: "Demandante", accessor: "plaintiff.company" },
    { Header: "Demandado", accessor: "defendant.company" },
    { Header: "Estado", accessor: "status.label" },
    { Header: "Última Nota", accessor: "notes[0].content" },
    { Header: "Acciones", accessor: "actions", textAlign: "center" },
  ];

  return (
    <MDBox>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Stats countByStatuses={countByStatuses} />
            <MDBox display="flex" justifyContent="space-between" p={3} m={3}>
              <Filters statuses={statuses} />
              <Link href="/projects/create">
                <MDButton variant="gradient" color="dark">
                  Nuevo Proyecto
                </MDButton>
              </Link>
            </MDBox>
            <MDBox py={1}>
              <Table columns={columns} rows={projects} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
