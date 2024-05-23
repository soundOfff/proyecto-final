import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getTaskPriorities, getAll as getAllTasks } from "/actions/tasks";
import { getTaskStatus } from "/actions/tasks";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { getAll as getAllPartners } from "/actions/partners";
import { getCurrentTimer } from "/actions/timers";
import { getAll as getAllActions } from "/actions/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export default async function Tasks({
  searchParams: { perPage = 10, page = 1 },
}) {
  const session = await getServerSession(authOptions);

  const [
    tasks,
    tagsData,
    repeats,
    priorities,
    taskableItems,
    statuses,
    partners,
    currentTimer,
    actionsData,
  ] = await Promise.all([
    getAllTasks({
      perPage: perPage,
      page: page,
      include: ["assigneds", "tags", "status", "dependencies"],
    }),
    getAllTags(),
    getAllRepeats(),
    getTaskPriorities(),
    getAllTaskableTypes({
      perPage: perPage,
      page: page,
    }),
    getTaskStatus(),
    getAllPartners(),
    getCurrentTimer(session.staff.id),
    getAllActions(),
  ]);

  return (
    <MDBox mb={3}>
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
              dependencyTasks={tasks}
              partners={partners}
              statuses={statuses}
              currentTimer={currentTimer}
              actionsData={actionsData}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
