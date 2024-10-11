"use client";

import { useDataProvider } from "/providers/DataProvider";
import { Grid } from "@mui/material";
import Table from "/components/Tasks/table-client";
import MDBox from "/components/MDBox";
import Stats from "./components/stats";
import Filters from "./components/filters";
import { useSearchParams } from "next/navigation";

export default function Tasks() {
  const {
    statuses,
    priorities,
    staffs,
    project,
    repeats,
    tagsData,
    partners,
    dependencyTasks,
    notificationPriorities,
    taskableItems,
    actionsData,
    tableFields,
  } = useDataProvider();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  const taskDateFilter =
    dateFrom || dateTo ? { "filter[date]": `${dateFrom},${dateTo}` } : null;
  const taskSearchFilter = search ? { "filter[search]": search } : null;

  return (
    <Grid container spacing={10}>
      <Grid item xs={4}>
        <Stats />
      </Grid>
      <Grid item xs={8}>
        <Filters />
      </Grid>
      <Grid item xs={12} py={1} mt={4}>
        <Table
          {...{
            statuses,
            priorities,
            staffs,
            project,
            repeats,
            filters: { ...taskDateFilter, ...taskSearchFilter },
            tagsData,
            partners,
            dependencyTasks,
            taskableItems,
            actionsData,
            tableFields,
            notificationPriorities,
          }}
        />
      </Grid>
    </Grid>
  );
}
