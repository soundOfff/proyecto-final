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
import { getCurrentTimer } from "/actions/timers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function PartnerTasks({
  params: { id },
  searchParams: { perPage = 10, page = 1 },
}) {
  const tasks = await getAll({
    include: ["assigneds", "tags", "status", "dependencies"],
    "filter[partner_id]": id,
    perPage: perPage,
    page: page,
  });

  const session = await getServerSession(authOptions);
  const tagsData = await getAllTags();
  const repeats = await getAllRepeats();
  const priorities = await getTaskPriorities();
  const taskableItems = await getAllTaskableTypes();
  const statuses = await getTaskStatus();
  const partners = await getAllPartners();
  const currentTimer = await getCurrentTimer(session.staff.id);

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table
              rows={tasks}
              meta={{ per_page: perPage, page: page }}
              priorities={priorities}
              repeats={repeats}
              taskableItems={taskableItems}
              tagsData={tagsData}
              partners={partners}
              statuses={statuses}
              currentTimer={currentTimer}
              partnerId={Number(id)}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
