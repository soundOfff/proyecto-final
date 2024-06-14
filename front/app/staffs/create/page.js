import React from "react";
import MDBox from "/components/MDBox";
import Form from "/app/staffs/components/form";
import { Card, Grid } from "@mui/material";

export default async function Create() {
  return (
    <MDBox
      mb={3}
      width="100%"
      display="flex"
      alignContent="center"
      justifyContent="center"
    >
      <Card sx={{ width: "60%" }}>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Form />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
