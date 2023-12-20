import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import { getAll as getAllExpenses } from "/actions/expenses";
import Table from "./components/table";

export default async function Expenses() {
  const expenses = await getAllExpenses({
    include: ["category", "project", "invoice", "user.partners"],
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={expenses} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
