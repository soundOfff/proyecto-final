import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll as getAllInvoices } from "/actions/invoices";

export default async function Invoices() {
  const include = [
    "project.serviceType",
    "partner",
    "estimate",
    "shippingCountry",
    "billingCountry",
  ];
  const invoices = await getAllInvoices({ include });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={invoices} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
