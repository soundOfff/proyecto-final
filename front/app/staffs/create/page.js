import React from "react";
import MDBox from "/components/MDBox";
import { Card, Grid } from "@mui/material";

export default async function Create() {
  // TODO: Implement create page
  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            Create page
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
