"use client";

import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import Table from "./components/table";

import { getAll as getAllTasks } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";
import { getStats } from "/actions/tasks";
import Stats from "./components/stats";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

const include = ["timers", "status", "assigneds", "taskable", "partner"];

export default function Timers() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { project } = useDataProvider();

  useEffect(() => {
    const params = {
      include,
      sort: "-start_date",
      "filter[taskable_id]": project.id,
      "filter[taskable_type]": "project",
    };

    getStats({ projectId: project.id }).then((data) => setStats(data));
    getAllTasks(params).then((data) => {
      setTasks(data.data.tasks);
      setIsLoading(false);
    });
  }, [project]);

  return (
    <MDBox mb={3}>
      <Grid container spacing={3} p={5}>
        <Grid item xs={12}>
          <Stats
            totalTime={stats?.total_time}
            totalWeekTime={stats?.total_week_time}
            totalMonthTime={stats?.total_month_time}
          />
          <MDBox py={1}>
            {isLoading ? <Loader /> : <Table rows={tasks} project={project} />}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
