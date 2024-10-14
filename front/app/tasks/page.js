import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "/components/Tasks/table-server";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllRepeats } from "/actions/task-repeats";
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
import { select as getAllStaffs } from "/actions/staffs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";
import { getSelect as getSelectTasks } from "/actions/tasks";
import { getAllPriorities as getAllNotificationPriorities } from "/actions/notifications";

export default async function Tasks({
  searchParams: { perPage = 50, page = 1, sort = "-id" },
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
    {
      data: { projects: taskableItems },
    },
    statuses,
    {
      data: { partners },
    },
    currentTimer,
    actionsData,
    tableFields,
    staffs,
    dependencyTasks,
    notificationPriorities,
  ] = await Promise.all([
    getAllTasks({
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
    getAllStaffs(),
    getSelectTasks(),
    getAllNotificationPriorities(),
  ]);

  return (
    <MDBox mb={1}>
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
              dependencyTasks={dependencyTasks}
              partners={partners}
              staffs={staffs}
              statuses={statuses}
              currentTimer={currentTimer}
              actionsData={actionsData}
              tableFields={tableFields}
              notificationPriorities={notificationPriorities}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
