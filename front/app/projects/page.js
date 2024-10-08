import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";

import { getAll as getAllProjects } from "/actions/projects";
import { getAll as getAllStatuses } from "/actions/project-statuses";
import { getCountByStatuses } from "/actions/projects";

import Table from "./components/table";
import Filters from "./components/filters";
import Stats from "./components/stats";

const include = [
  "notes",
  "status",
  "files",
  "billablePartner",
  "serviceType.processes",
];

export const dynamic = "force-dynamic";

export default async function Projects({ searchParams }) {
  const { statusId, search, perPage = 10, page = 1 } = searchParams;

  const statusFilter = statusId ? { "filter[status]": statusId } : null;
  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...statusFilter,
    ...searchFilter,
    perPage,
    page,
  };

  const {
    meta,
    data: { projects },
  } = await getAllProjects(params);
  const statuses = await getAllStatuses();
  const countByStatuses = await getCountByStatuses();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Stats countByStatuses={countByStatuses} />
            <Filters statuses={statuses} />
            <MDBox py={1}>
              <Table rows={projects} meta={meta} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
