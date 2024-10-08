import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import ExpensesChart from "./components/expenses-chart";

import IncomesChart from "./components/incomes-chart";
import ExpensesTable from "./components/expenses-table";
import { monthlyExpenses } from "/actions/expenses";

export const dynamic = "force-dynamic";

export default async function Reports({ searchParams }) {
  const expensesData = await monthlyExpenses(searchParams.year ?? 2019);
  // const expenses = expensesData.expenses.map((expense) => {
  //   console.log(expense);
  // });
  return (
    <MDBox mb={3}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} lg={4}>
          <ExpensesChart />
        </Grid>
        <Grid item xs={12} sm={6} lg={8}>
          <IncomesChart />
        </Grid>
      </Grid>
      <Grid item xs={12} mt={5}>
        <ExpensesTable rows={[]} meta={{ perPage: 50, page: 1 }} />
      </Grid>
    </MDBox>
  );
}
