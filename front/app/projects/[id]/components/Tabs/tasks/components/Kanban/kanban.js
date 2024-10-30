"use client";

import { useCallback, useEffect, useState } from "react";
import { getAll } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";
import Kanban from "/components/Kanban";
import MDBox from "/components/MDBox";
import Filters from "./filters";
import Loader from "/components/Loader";

const include = [
  "status",
  "assigneds",
  "partner",
  "checklistItems",
  "dependencies",
];

export default function KanbanIndex() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { project } = useDataProvider();
  const [params, setParams] = useState({
    include,
    sort: "milestone_order",
    "filter[taskable_id]": project.id,
    "filter[taskable_type]": "project",
  });

  const fetchTasks = useCallback(() => {
    setIsLoading(true);
    getAll(params).then((data) => {
      setTasks(data.data.tasks);
      setIsLoading(false);
    });
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <MDBox>
      <Filters params={params} setParams={setParams} refetch={fetchTasks} />
      {isLoading && <Loader />}
      <Kanban tasks={tasks} refetch={fetchTasks} />
    </MDBox>
  );
}
