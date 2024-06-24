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

import Header from "./components/header";
import Table from "./components/table";
import Footer from "./components/footer";
import { show } from "/actions/proposals";

export default async function Show({ params: { id } }) {
  const proposal = await show(id, {
    include: [
      "currency",
      "estimate",
      "invoice",
      "status",
      "lineItems.taxes",
      "tags",
      "proposable",
      "comments",
      "country",
    ],
  });

  return (
    <MDBox mt={2} mb={4}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} className="container-print">
          <Card>
            <Header proposal={proposal} />
            <Table proposal={proposal} />
            <Footer proposal={proposal} />
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
