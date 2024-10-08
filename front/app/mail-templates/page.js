// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

import Table from "./components/table";
import { getAll as getAllGroups } from "/actions/mail-template-groups";

export const dynamic = "force-dynamic";

export default async function MailTemplates() {
  const groups = await getAllGroups({
    include: ["mailTemplates.lang"],
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} py={2}>
          <Grid item xs={12}>
            <MDBox py={1}>
              <Table groups={groups} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
