import { Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import StatsLoading from "./components/loading/stats";
import FiltersLoading from "./components/loading/filters";
import TableLoading from "./components/loading/table";

export default function Loading() {
  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <StatsLoading />
            <FiltersLoading />
            <TableLoading />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
