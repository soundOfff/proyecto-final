// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";

import Header from "./components/header";
import Table from "./components/table";
import Footer from "./components/footer";

import { show } from "/actions/invoices";

export default async function Show({ params: { id } }) {
  const invoice = await show(id, {
    include: [
      "partner",
      "project.serviceType",
      "currency",
      "estimate",
      "billingCountry",
      "shippingCountry",
      "tags",
      "lineItems.taxes",
    ],
  });

  return (
    <MDBox mt={2} mb={4} className="container-print">
      <Grid container justifyContent="center" className="card-container-print">
        <Grid item xs={12} sm={10} md={8} className="card-container-print">
          <Card className="card-container-print">
            <Header invoice={invoice} />
            <Table invoice={invoice} />
            <Footer invoice={invoice} />
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
