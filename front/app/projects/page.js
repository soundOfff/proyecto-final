// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

import useTranslation from "next-translate/useTranslation";

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

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Stats countByStatuses={countByStatuses} />
            <Filters statuses={statuses} />
            <MDBox py={1}>
              <Table rows={projects} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
