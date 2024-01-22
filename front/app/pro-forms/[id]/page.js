/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";

// NextJS Material Dashboard 2 PRO context
import Header from "./components/header";
import Table from "./components/table";
import Footer from "./components/footer";
import { show } from "/actions/estimates";

export default async function Show({ params: { id } }) {
  const estimate = await show(id, {
    include: [
      "partner",
      "project.serviceType",
      "currency",
      "invoice",
      "billingCountry",
      "shippingCountry",
      "tags",
      "lineItems.taxes",
    ],
  });

  return (
    <MDBox mt={2} mb={4}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Card>
            <Header estimate={estimate} />
            <Table estimate={estimate} />
            <Footer estimate={estimate} />
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
