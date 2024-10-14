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
  const { search, perPage = 50, page = 1, sort = "-id" } = searchParams;

  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...searchFilter,
    perPage,
    page,
    sort,
  };

  const {
    data: { payments },
    meta,
  } = await getAllPayments(params);
  const paymentMethods = await getAllPaymentMethods();
  const {
    data: { partners },
  } = await getAllPartners();

  return (
    <MDBox mb={1}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Filters paymentMethods={paymentMethods} partners={partners} />
            <MDBox>
              <Table rows={payments} meta={meta} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
