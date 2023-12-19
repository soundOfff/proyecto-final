import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import Sidenav from "./components/sidenav";
import Header from "./components/header";
import { show } from "/actions/partners";

export default async function Layout({ children, params: { id } }) {
  const partner = await show(id, {
    include: ["user.contacts", "country", "consolidator"],
  });
  const primaryContact = partner.user.contacts.find(
    (contact) => contact?.isPrimary == true
  );
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
                <Header contact={primaryContact} />
                {children}
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
