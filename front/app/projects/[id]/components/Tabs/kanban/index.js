"use client";

import { useCallback, useEffect, useState } from "react";
import { getAll } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";
import Kanban from "/components/Kanban";
import MDBox from "/components/MDBox";

const include = [
  "status",
  "assigneds",
  "partner",
  "checklistItems",
  "dependencies",
];

export default function ProjectTasksKanban() {
  const [tasks, setTasks] = useState([]);
  const { project } = useDataProvider();

  const fetchTasks = useCallback(() => {
    const params = {
      include,
      sort: "-start_date",
      "filter[taskable_id]": project.id,
      "filter[taskable_type]": "project",
    };
    getAll(params).then((data) => {
      setTasks(data.data.tasks);
    });
  }, [project.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <MDBox>
      <Kanban tasks={tasks} refetch={fetchTasks} />
    </MDBox>
  );
}
