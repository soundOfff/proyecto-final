"use client";

import { useCallback, useEffect, useState } from "react";
import { getAll } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";
import Kanban from "/components/Kanban";
import MDBox from "/components/MDBox";
import Filters from "./filters";
import Loader from "/components/Loader";
import { useSearchParams } from "next/navigation";

const include = [
  "status",
  "assigneds",
  "partner",
  "checklistItems",
  "dependencies",
];

export default function KanbanIndex() {
  const searchParams = useSearchParams();
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

  useEffect(() => {
    if (searchParams.get("myTasks")) {
      setParams((prev) => ({
        ...prev,
        "filter[staff_id]": searchParams.get("myTasks"),
      }));
    }
    if (searchParams.get("priorityId")) {
      setParams((prev) => ({
        ...prev,
        "filter[task_priority_id]": searchParams.get("priorityId"),
      }));
    }
    if (searchParams.get("staffId")) {
      setParams((prev) => ({
        ...prev,
        "filter[staff_id]": searchParams.get("staffId"),
      }));
    }
    if (searchParams.get("startDate")) {
      const [startDate, endDate] = searchParams.get("startDate").split(",");
      setParams((prev) => ({
        ...prev,
        "filter[range_start_date]": `${startDate},${endDate}`,
      }));
    }
    if (searchParams.get("dueDate")) {
      const [startDate, endDate] = searchParams.get("dueDate").split(",");
      setParams((prev) => ({
        ...prev,
        "filter[range_due_date]": `${startDate},${endDate}`,
      }));
    }
  }, []);

  return (
    <MDBox>
      <Filters params={params} setParams={setParams} />
      {isLoading && <Loader />}
      <Kanban tasks={tasks} refetch={fetchTasks} />
    </MDBox>
  );
}
