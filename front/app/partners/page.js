// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

import { getAll as getAllPartners } from "/actions/partners";

import Table from "./components/table";

const include = ["user.contacts"];

export default async function Partners() {
  const params = {
    include,
  };

  const partners = await getAllPartners(params);

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <MDBox py={1}>
              <Table rows={partners} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
