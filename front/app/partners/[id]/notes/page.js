import { Card, Grid } from "@mui/material";
import { getAll } from "/actions/notes";
import MDBox from "/components/MDBox";
import Table from "./components/table";

export default async function PartnerNotes({ params: { id } }) {
  const notes = await getAll({
    "filter[notable_type]": "customer",
    "filter[notable_id]": id,
  });

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={notes} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
