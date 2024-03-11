import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllTasks } from "/actions/tasks";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getTaskPriorities } from "/actions/tasks";
import { getTaskStatus } from "/actions/tasks";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { getAll as getAllPartners } from "/actions/partners";
import { getCurrentTimer } from "../../actions/timers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export default async function Tasks({ searchParams }) {
  const tasks = await getAllTasks({
    perPage: 5,
    page: 1,
    include: ["assigneds", "tags", "status"],
  });
  const session = await getServerSession(authOptions);
  const tagsData = await getAllTags();
  const repeats = await getAllRepeats();
  const priorities = await getTaskPriorities();
  const taskableItems = await getAllTaskableTypes({ perPage: 20, page: 1 });
  const statuses = await getTaskStatus();
  const partners = await getAllPartners();
  const currentTimer = await getCurrentTimer(session.staff.id);

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table
              rows={tasks}
              meta={{ per_page: "5" }}
              priorities={priorities}
              repeats={repeats}
              taskableItems={taskableItems}
              tagsData={tagsData}
              partners={partners}
              statuses={statuses}
              currentTimer={currentTimer}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
