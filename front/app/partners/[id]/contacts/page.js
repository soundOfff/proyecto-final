import { getAll } from "/actions/contacts";
import { Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import Table from "./components/table";

export default async function Contacts({ params: { id } }) {
  const contacts = await getAll({ "filter[partner_id]": id });

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={contacts} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
