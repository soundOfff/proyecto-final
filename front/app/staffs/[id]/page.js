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
      alignContent="center"
      justifyContent="center"
      spacing={3}
    >
      <Stats data={staffStats} />
      <MDBox
        display="flex"
        flexDirection="row"
        width="100%"
        sx={{
          "@media (max-width: 768px)": {
            flexDirection: "column",
          },
        }}
      >
        <Card
          sx={{
            width: "50%",
            height: "100%",
            margin: "20px",
            "@media (max-width: 768px)": {
              width: "100%",
              margin: "0px",
            },
          }}
        >
          <Grid container spacing={3} p={5}>
            <Grid item xs={12}>
              <Form staff={staff} />
            </Grid>
          </Grid>
        </Card>
        <MDBox
          display="flex"
          flexDirection="column"
          width="50%"
          sx={{
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Card
            sx={{
              margin: "20px",
              "@media (max-width: 768px)": {
                margin: "20px 0 20px 0",
              },
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
    </MDBox>
  );
}
