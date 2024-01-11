import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll } from "/actions/estimates";

export default async function Estimates() {
  const include = [
    "project.serviceType",
    "partner",
    "invoice",
    "shippingCountry",
    "billingCountry",
  ];
  const estimates = await getAll({ include });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={estimates} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
