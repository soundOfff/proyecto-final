import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import { getAll as getAllExpenses } from "/actions/expenses";
import Table from "./components/table";

export default async function Expenses({
  searchParams: { perPage = 10, page = 1, sort = "-id" },
}) {
  const {
    data: { expenses },
    meta,
  } = await getAllExpenses({
    sort,
    include: ["category", "project", "invoice", "partner"],
    perPage,
    page,
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={expenses} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
