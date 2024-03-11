import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import StatsLoading from "./components/loading/stats";
import TableLoading from "./components/loading/table";

export default function Loading() {
  return (
    <MDBox mb={3} height="100%">
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" flexDirection="column" gap="30px 0px">
          <Card mb={2}>
            <Grid container spacing={3} p={5}>
              <Grid item xs={12}>
                <StatsLoading />
              </Grid>
            </Grid>
          </Card>
          <Card>
            <Grid container spacing={3} p={5}>
              <Grid item xs={12}>
                <TableLoading />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
