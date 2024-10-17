import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "/components/Tasks/table-server";
import { getAll as getAllTasks, getTaskStatus } from "/actions/tasks";
import { getCurrentTimer } from "/actions/timers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export default async function Tasks({
  searchParams: { perPage = 50, page = 1, sort = "-id" },
}) {
  const session = await getServerSession(authOptions);
  const currentTimer = await getCurrentTimer(session.staff.id);
  const {
    data: { tasks },
    meta,
  } = await getAllTasks({
    perPage: perPage,
    page: page,
    sort,
    include: [
      "assigneds",
      "tags",
      "status",
      "dependencies",
      "author",
      "taskable",
    ],
  });

  return (
    <MDBox mb={1}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table tasks={tasks} meta={meta} currentTimer={currentTimer} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
