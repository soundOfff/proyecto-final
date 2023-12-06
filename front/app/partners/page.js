// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

import { getAll as getAllPartners } from "/actions/partners";
import { getStats as getPartnerStats } from "/actions/partners";
import { getStats as getContactStats } from "/actions/contacts";

import Table from "./components/table";
import Stats from "./components/stats";

const include = ["user.contacts"];

export default async function Partners() {
  const params = {
    include,
  };

  const partners = await getAllPartners(params);
  const contactStats = await getContactStats();
  const partnerStats = await getPartnerStats();
  const stats = { contact: contactStats, partner: partnerStats };

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Stats stats={stats} />
            <MDBox py={1}>
              <Table rows={partners} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
