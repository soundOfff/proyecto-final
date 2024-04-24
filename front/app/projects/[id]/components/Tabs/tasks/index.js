"use client";

import { Card, Grid } from "@mui/material";
import Table from "./components/table";
import MDBox from "/components/MDBox";
import Stats from "./components/stats";

export default function Tasks() {
  return (
    <MDBox py={3}>
      <Stats />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MDBox py={1}>
            <Table />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
