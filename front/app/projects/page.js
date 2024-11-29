import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";

import {
  getAll as getAllProjects,
  getCountByStatuses,
} from "/actions/projects";
import { getAll as getAllStatuses } from "/actions/project-statuses";

import Table from "./components/table";
import Filters from "./components/filters";
import Stats from "./components/stats";

const include = [
  "staffs",
  "billablePartner",
  "billingType",
  "files",
  "serviceType",
  "status",
  "members",
  "proposal",
  "notes",
  "court",
];

export const dynamic = "force-dynamic";

export default async function Projects({ searchParams }) {
  const { statusId, search, perPage = 50, page = 1 } = searchParams;

  const statusFilter = statusId ? { "filter[status]": statusId } : null;
  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...statusFilter,
    ...searchFilter,
    perPage,
    page,
  };

  const [
    {
      data: { projects },
      meta,
    },
    statuses,
    countByStatuses,
  ] = await Promise.all([
    getAllProjects(params),
    getAllStatuses(),
    getCountByStatuses(),
  ]);

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
