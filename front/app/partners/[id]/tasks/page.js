import { Card, Grid } from "@mui/material";
import { getAll } from "/actions/tasks";
import MDBox from "/components/MDBox";
import Table from "/components/Tasks/table-server";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getTaskPriorities } from "/actions/tasks";
import { getTaskStatus } from "/actions/tasks";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { getAll as getAllPartners } from "/actions/partners";
import { getAll as getAllStaffs } from "/actions/staffs";
import { getCurrentTimer } from "/actions/timers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";
import { getAllPriorities as getAllNotificationPriorities } from "/actions/notifications";

export const dynamic = "force-dynamic";

export default async function PartnerTasks({
  params: { id },
  searchParams: { perPage = 10, page = 1 },
}) {
  const {
    data: { tasks },
    meta,
  } = await getAll({
    include: ["assigneds", "tags", "status", "dependencies", "author"],
    "filter[partner_id]": id,
    perPage: perPage,
    page: page,
  });

  const session = await getServerSession(authOptions);
  const tagsData = await getAllTags();
  const repeats = await getAllRepeats();
  const staffs = await getAllStaffs();
  const priorities = await getTaskPriorities();
  const {
    data: { projects: taskableItems },
  } = await getAllTaskableTypes();
  const statuses = await getTaskStatus();
  const partners = await getAllPartners();
  const currentTimer = await getCurrentTimer(session.staff.id);
  const notificationPriorities = await getAllNotificationPriorities();

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table
              rows={tasks}
              meta={meta}
              priorities={priorities}
              repeats={repeats}
              taskableItems={taskableItems}
              tagsData={tagsData}
              partners={partners}
              statuses={statuses}
              staffs={staffs}
              currentTimer={currentTimer}
              partnerId={Number(id)}
              notificationPriorities={notificationPriorities}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
