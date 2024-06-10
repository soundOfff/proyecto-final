import MDBox from "/components/MDBox";
import Form from "/app/staffs/components/form";
import { Card, Grid } from "@mui/material";
import Stats from "../components/stats";
import { show } from "/actions/staffs";

export default async function Show({ params: { id } }) {
  const staff = await show(id, { include: "projects" });
  return (
    <MDBox
      mb={3}
      width="100%"
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      spacing={3}
    >
      <Stats />
      <MDBox display="flex">
        <Card sx={{ width: "50%", height: "100%", margin: "20px" }}>
          <Grid container spacing={3} p={5}>
            <Grid item xs={12}>
              <Form staff={staff} />
            </Grid>
          </Grid>
        </Card>
        <MDBox display="flex" flexDirection="column" width="50%">
          <Card sx={{ margin: "20px" }}>
            <Grid container spacing={3} p={5}>
              <Grid item xs={12}>
                Reports table
              </Grid>
            </Grid>
          </Card>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
