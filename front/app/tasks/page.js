import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { TASKABLE_TYPES } from "../../utils/constants/taskableTypes";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllTasks } from "/actions/tasks";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getTaskPriorities } from "/actions/tasks";
import { getTaskStatus } from "/actions/tasks";
import { getAll as getAllTaskableTypes } from "/actions/projects";

export default async function Expenses({
  searchParams: { perPage = 10, page = 1 },
}) {
  const {
    data: { tasks },
    meta,
  } = await getAllTasks({
    perPage,
    page,
    include: ["assigneds", "tags", "status"],
  });
  const tagsData = await getAllTags();
  const repeats = await getAllRepeats();
  const priorities = await getTaskPriorities();
  const taskableItems = await getAllTaskableTypes({ perPage: 20, page: 1 });
  const statuses = await getTaskStatus();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            {/* <Stats countByStatuses={countByStatuses} /> */}
            <Table
              rows={tasks}
              meta={{ per_page: "5" }}
              priorities={priorities}
              repeats={repeats}
              taskableTypes={TASKABLE_TYPES}
              taskableItems={taskableItems}
              tagsData={tagsData}
              statuses={statuses}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
