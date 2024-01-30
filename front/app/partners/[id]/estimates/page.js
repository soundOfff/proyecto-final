import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll } from "/actions/estimates";

export default async function Estimates({
  params: { id },
  searchParams: { perPage = 10, page = 1 },
}) {
  const include = [
    "project.serviceType",
    "partner",
    "invoice",
    "shippingCountry",
    "billingCountry",
  ];
  const {
    data: { estimates },
    meta,
  } = await getAll({ include, "filter[partner_id]": id, perPage, page });

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={estimates} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
