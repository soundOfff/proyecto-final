"use client";

import { Grid } from "@mui/material";
import Table from "./components/table";
import MDBox from "/components/MDBox";

export default function Tasks() {
  return (
    <MDBox py={3}>
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
