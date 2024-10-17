"use client";

import { useEffect, useState } from "react";
import { getAll } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";
import Loader from "../components/loader";
import Kanban from "/components/Kanban";
import MDBox from "/components/MDBox";

const include = ["status", "assigneds", "partner", "checklistItems"];

export default function ProjectTasksKanban() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { project } = useDataProvider();

  useEffect(() => {
    const params = {
      include,
      sort: "-start_date",
      "filter[taskable_id]": project.id,
      "filter[taskable_type]": "project",
    };
    getAll(params).then((data) => {
      setTasks(data.data.tasks);
      setIsLoading(false);
    });
  }, [project]);

  return isLoading ? (
    <Loader />
  ) : (
    <MDBox>
      <Kanban tasks={tasks} />
    </MDBox>
  );
}
