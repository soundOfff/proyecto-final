import { Card, Grid } from "@mui/material";
import { getAll } from "/actions/expenses";
import MDBox from "/components/MDBox";
import Table from "./components/table";

export default async function PartnerExpenses({ params: { id } }) {
  const {
    data: { expenses },
  } = await getAll({
    include: ["category", "project", "invoice", "user.partners"],
    "filter[partner_id]": id,
  });

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={expenses} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
