import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "/components/MDBox";

import Table from "./components/table";
import Filters from "./components/filters";
import { getAll as getAllPayments } from "/actions/payments";
import { getAll as getAllPaymentMethods } from "/actions/payment-methods";
import { getAll as getAllPartners } from "/actions/partners";

const include = ["partner", "paymentMethod", "invoices"];

export const dynamic = "force-dynamic";

export default async function Payments({ searchParams }) {
  const { search } = searchParams;

  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...searchFilter,
  };

  const payments = await getAllPayments(params);
  const paymentMethods = await getAllPaymentMethods();
  const partners = await getAllPartners();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Filters paymentMethods={paymentMethods} partners={partners} />
            <MDBox py={1}>
              <Table rows={payments} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
