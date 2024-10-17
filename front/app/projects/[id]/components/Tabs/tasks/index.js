"use client";

import { useDataProvider } from "/providers/DataProvider";
import { Grid } from "@mui/material";
import Table from "/components/Tasks/table-client";
import MDBox from "/components/MDBox";
import Stats from "./components/stats";

export default function Tasks() {
  const { project } = useDataProvider();

  return (
    <MDBox>
      <Stats />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MDBox py={1}>
            <Table project={project} />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
