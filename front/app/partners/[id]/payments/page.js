import { Card, Grid } from "@mui/material";
import { getAll } from "/actions/payments";
import MDBox from "/components/MDBox";
import Table from "./components/table";

export default async function PartnerInvoices({ params: { id } }) {
  const payments = await getAll({
    include: ["paymentMethod", "partner", "invoices"],
    "filter[partner_id]": id,
  });

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={payments} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
