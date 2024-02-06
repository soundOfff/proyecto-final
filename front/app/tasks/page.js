import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import Stats from "./components/stats";

import { getCountByStatuses } from "/actions/tasks";
import { getAll as getAllTasks } from "/actions/tasks";

export default async function Expenses({
  searchParams: { perPage = 10, page = 1 },
}) {
  const {
    data: { tasks },
    meta,
  } = await getAllTasks({ perPage, page });
  const countByStatuses = await getCountByStatuses();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            {/* <Stats countByStatuses={countByStatuses} /> */}
            <Table rows={[]} meta={{ per_page: "5" }} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
