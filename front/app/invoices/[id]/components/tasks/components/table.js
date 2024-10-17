"use client";

import { useDataProvider } from "/providers/DataProvider";

import { useEffect, useState } from "react";
import Table from "/components/Tasks/table-server";
import { useSearchParams } from "next/navigation";
import { getAll } from "/actions/tasks";
import { INVOICE_TYPE } from "/utils/constants/taskableTypes";
import { Grid, Card } from "@mui/material";
import MDBox from "/components/MDBox";

export default function TableComponent() {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 50 });
  const searchParams = useSearchParams();

  const { invoice, currentTimer } = useDataProvider();

  useEffect(() => {
    getAll({
      "filter[taskable_id]": invoice.id,
      "filter[taskable_type]": INVOICE_TYPE,
      perPage: searchParams.get("perPage") || 50,
      page: searchParams.get("page") || 1,
      include: ["assigneds", "tags", "status", "dependencies", "author"],
    }).then((data) => {
      setTasks(data.data.tasks);
      setMeta(data.meta);
    });
  }, [invoice, searchParams]);

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table
              tasks={tasks}
              meta={meta}
              currentTimer={currentTimer}
              invoice={invoice}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
