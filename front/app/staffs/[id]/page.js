import MDBox from "/components/MDBox";
import Form from "/app/staffs/components/form";
import { Card, Grid } from "@mui/material";
import Stats from "../components/stats";
import { show, stats as getStaffStats } from "/actions/staffs";
import Table from "./components/table";

export default async function Show({ params: { id } }) {
  const staff = await show(id, { include: "projects.status" });
  const staffStats = await getStaffStats(id);
  return (
    <MDBox
      mb={3}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Stats data={staffStats} />
      <MDBox
        display="flex"
        width="100%"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Card
          sx={{
            width: { xs: "100%", md: "48%" },
            margin: "20px 0",
          }}
        >
          <Grid container spacing={3} p={5}>
            <Grid item xs={12}>
              <Form staff={staff} />
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            width: { xs: "100%", md: "48%" },
            margin: "20px 0",
            height: "40%",
            maxHeight: "100%",
          }}
        >
          <Grid container spacing={3} p={5}>
            <Grid item xs={12}>
              <Table projects={staff?.projects} />
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </MDBox>
  );
}
