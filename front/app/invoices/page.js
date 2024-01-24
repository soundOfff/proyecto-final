import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";

export default async function Estimates() {
  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={[]} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
