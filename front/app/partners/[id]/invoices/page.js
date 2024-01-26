import { Card, Grid } from "@mui/material";
import { getAll } from "/actions/invoices";
import MDBox from "/components/MDBox";
import Table from "./components/table";

export default async function PartnerInvoices({ params: { id } }) {
  const {
    data: { invoices },
  } = await getAll({
    include: [
      "project.serviceType",
      "partner",
      "estimate",
      "shippingCountry",
      "billingCountry",
    ],
    "filter[partner_id]": id,
  });

  return (
    <MDBox my={3}>
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
