"use client";

import { Card, Grid } from "@mui/material";
import Table from "./components/table";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Stats from "./components/stats";

export default function Tasks() {
  return (
    <MDBox py={3}>
      <Stats totalTime={12} totalWeekTime={12} totalMonthTime={12} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <MDBox py={1}>
              <Table rows={[]} meta={{ per_page: "5" }} />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
