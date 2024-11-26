import Grid from "@mui/material/Grid";
import MDBox from "/components/MDBox";
import ExpensesChart from "./components/expenses-chart";

import IncomesChart from "./components/incomes-chart";
import ExpensesTable from "./components/expenses-table";
import { monthlyExpenses } from "/actions/expenses";
import paymentsInfo from "/actions/payments";
import { getSelectAll as getProjectsSelect } from "/actions/projects";
import { getBalance } from "../../actions/projects";

export const dynamic = "force-dynamic";

function completeMonthlyTotals(data) {
  // Initialize an array with all months of the year (1 to 12)
  const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  // Create a map of the existing data for quick lookup
  const dataMap = data.reduce((map, item) => {
    map[item.month] = parseFloat(item.total); // Parse total to ensure it's a number
    return map;
  }, {});

  // Generate the full array with completed months
  const result = allMonths.map((month) => ({
    month, // Keep the month number (1-12)
    total: dataMap[month] || 0, // Use existing total or default to 0
  }));

  return result;
}

export default async function Reports({
  searchParams = { year: 2024, projectId: null },
}) {
  const { expenses } = await monthlyExpenses(parseInt(searchParams.year));
  const { payments } = await paymentsInfo();
  const projects = await getProjectsSelect();
  const { paid, billed } = await getBalance(
    searchParams.projectId || projects[0].id
  );

  const mappedBilledData = completeMonthlyTotals(billed);
  const mappedPaidData = completeMonthlyTotals(paid);

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
          <IncomesChart
            projects={projects}
            data={{
              billed: mappedBilledData.map((item) => item.total),
              paid: mappedPaidData.map((item) => item.total),
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} mt={5}>
        <ExpensesTable rows={mappedData} meta={{ per_page: 10, page: 1 }} />
      </Grid>
    </MDBox>
  );
}
