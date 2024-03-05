import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";

import { getAll as getAllTasks } from "/actions/tasks";
import { getAll as getAllPartners } from "/actions/partners";
import { getAll as getAllProjects } from "/actions/projects";
import { getStats } from "../../actions/staffs";
import Stats from "./components/stats";
import Filters from "./components/filters";

export const dynamic = "force-dynamic";

const include = ["timers", "status", "assigneds", "taskable", "partner"];

export default async function Reports({ searchParams }) {
  const { period, projectId, partnerId, myTasks } = searchParams;

  const projectFilter = projectId ? { "filter[project_id]": projectId } : null;
  const partnerFilter = partnerId ? { "filter[partner_id]": partnerId } : null;
  const myTasksFilter = myTasks ? { "filter[my_tasks]": 5 } : null; // TODO: Set the correct staff_id
  const periodFilter = period ? { "filter[period]": period } : null;

  const params = {
    include,
    ...projectFilter,
    ...partnerFilter,
    ...myTasksFilter,
    ...periodFilter,
  };

  const {
    data: { tasks },
  } = await getAllTasks(params);
  const partners = await getAllPartners();
  const projects = await getAllProjects();
  const stats = await getStats(5); // TODO: change for real staff_id

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Stats
              totalTime={stats?.total_time}
              totalWeekTime={stats?.total_week_time}
              totalMonthTime={stats?.total_month_time}
            />
            <Filters partners={partners} projects={projects} />
            <MDBox py={1}>
              <Table rows={tasks} meta={{ per_page: "5" }} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
