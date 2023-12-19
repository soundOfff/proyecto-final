import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import Sidenav from "./components/sidenav";

export default function Layout({ children }) {
  return (
    <MDBox mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav />
        </Grid>
        <Grid item xs={12} lg={9}>
          <MDBox mb={3}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
