import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";

import { getAll as getAllTasks } from "/actions/tasks";
import { getAll as getAllPartners } from "/actions/partners";
import { getAll as getAllProjects } from "/actions/projects";
import { select as getStaffsSelect } from "/actions/staffs";
import { getStats } from "/actions/tasks";
import Stats from "./components/stats";
import Filters from "./components/filters";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";

export const dynamic = "force-dynamic";

const include = ["timers", "status", "assigneds", "taskable", "partner"];

export default async function Reports({ searchParams }) {
  const {
    period,
    projectId,
    partnerId,
    myTasks,
    staffId,
    perPage = 50,
    page = 1,
    sort = "-id",
  } = searchParams;
  const session = await getServerSession(authOptions);

  const projectFilter = projectId
    ? {
        "filter[taskable_id]": projectId,
        "filter[taskable_type]": PROJECT_TYPE,
      }
    : null;
  const partnerFilter = partnerId ? { "filter[partner_id]": partnerId } : null;
  const staffFilter = staffId ? { "filter[staff_id]": staffId } : null;
  const myTasksFilter = myTasks
    ? { "filter[staff_id]": session.staff.id }
    : null;
  const periodFilter = period ? { "filter[period]": period } : null;

  const params = {
    include,
    ...projectFilter,
    ...partnerFilter,
    ...myTasksFilter,
    ...periodFilter,
    ...staffFilter,
    perPage,
    page,
    sort,
  };

  const {
    data: { tasks },
    meta,
  } = await getAllTasks(params);
  const {
    data: { partners },
  } = await getAllPartners();
  const {
    data: { projects },
  } = await getAllProjects();
  const staffs = await getStaffsSelect();
  const stats = await getStats({ ownerId: session.staff.id });

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
            <Filters partners={partners} projects={projects} staffs={staffs} />
            <MDBox py={1}>
              <Table rows={tasks} meta={meta} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
