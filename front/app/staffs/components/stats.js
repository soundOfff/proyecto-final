import { Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";

export default function Stats() {
  return (
    <MDBox
      mb={3}
      width="100%"
      display="flex"
      alignContent="center"
      justifyContent="center"
    >
      <Card sx={{ height: "200px", width: "100%" }}>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            Stats
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
