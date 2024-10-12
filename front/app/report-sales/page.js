import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import ExpensesChart from "./components/expenses-chart";

import IncomesChart from "./components/incomes-chart";
import ExpensesTable from "./components/expenses-table";
import { monthlyExpenses } from "/actions/expenses";
import paymentsInfo from "/actions/payments";
import { getSelectAll as getProjectsSelect } from "/actions/projects";

export const dynamic = "force-dynamic";

export default async function Reports({
  searchParams = { year: 2024, projectId: null },
}) {
  const { expenses } = await monthlyExpenses(searchParams.year);
  const { payments } = await paymentsInfo();
  const projects = await getProjectsSelect();

  const mappedData = Object.keys(expenses).map((category) => {
    const row = { category };
    Object.keys(expenses[category]).forEach((month) => {
      row[month] = expenses[category][month];
    });
    return row;
  });

  return (
    <MDBox mb={3}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} lg={4}>
          <ExpensesChart payments={payments} />
        </Grid>
        <Grid item xs={12} sm={6} lg={8}>
          <IncomesChart projects={projects} />
        </Grid>
      </Grid>
      <Grid item xs={12} mt={5}>
        <ExpensesTable rows={mappedData} meta={{ per_page: 10, page: 1 }} />
      </Grid>
    </MDBox>
  );
}
