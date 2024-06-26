import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "/components/Tasks/table-server";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import {
  getTaskPriorities,
  getAll as getAllTasks,
  getTaskStatus,
} from "/actions/tasks";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { getAll as getAllPartners } from "/actions/partners";
import { getCurrentTimer } from "/actions/timers";
import { getAll as getAllActionTypes } from "/actions/action-types";
import { getTableFields } from "/actions/table-field";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export default async function Tasks({
  searchParams: { perPage = 10, page = 1 },
}) {
  const session = await getServerSession(authOptions);
  const tableName = "projects";

  const [
    {
      data: { tasks },
      meta,
    },
    tagsData,
    repeats,
    priorities,
    taskableItems,
    statuses,
    partners,
    currentTimer,
    actionsData,
    tableFields,
  ] = await Promise.all([
    getAllTasks({
      perPage: perPage,
      page: page,
      include: ["assigneds", "tags", "status", "dependencies", "author"],
    }),
    getAllTags(),
    getAllRepeats(),
    getTaskPriorities(),
    getAllTaskableTypes(),
    getTaskStatus(),
    getAllPartners(),
    getCurrentTimer(session.staff.id),
    getAllActionTypes(),
    getTableFields({ table: tableName }),
  ]);

  return (
    <MDBox mb={3}>
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
              dependencyTasks={tasks}
              partners={partners}
              statuses={statuses}
              currentTimer={currentTimer}
              actionsData={actionsData}
              tableFields={tableFields}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
