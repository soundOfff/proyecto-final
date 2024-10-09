import { Card, Divider, Grid } from "@mui/material";
import { show as showExpense } from "/actions/expenses";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import DefaultItem from "/examples/Items/DefaultItem";
import moneyFormat from "/utils/moneyFormat";
import SlackShare from "/components/SlackShare";

export default async function Page({ params: { id } }) {
  const expense = await showExpense(id, {
    include: ["category", "project", "invoice", "partner"],
  });

  return (
    <Card sx={{ px: 10, py: 10, my: 5 }}>
      <Grid container lineHeight={0} ml={2}>
        <Grid item xs={12} md={6}>
          <MDTypography variant="h4" mr={5} mb={1}>
            {expense.category.name}
          </MDTypography>
          <MDTypography color="text" fontWeight="light" mr={5}>
            {expense.name}
          </MDTypography>
        </Grid>
        <Grid
          item
          xs={6}
          md={2}
          whiteSpace="nowrap"
          mt={{ xxl: 0, md: 0, xs: 3 }}
        >
          <DefaultItem
            color="dark"
            title="Costo"
            icon="monetization_on_outlined"
            description={moneyFormat(expense.amount)}
          />
        </Grid>

        <Grid
          item
          xs={6}
          md={2}
          mt={{ xxl: 0, md: 0, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Fecha"
            icon="date_range"
            description={expense.date}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SlackShare modelId={expense?.id} modelType="Expense" />
        </Grid>
      </Grid>

      <Divider sx={{ width: "100%" }} />

      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Cliente"
            description={
              expense.partner
                ? expense.partner.company ?? expense.partner.name
                : "Sin cliente"
            }
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Factura"
            description={expense.invoice?.id}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        {expense.project && (
          <Grid xs={12} mt={3}>
            <MDBox ml={2} mt={0.5} lineHeight={1.4}>
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
              >
                Caso
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                textAlign="center"
              >
                {expense.project.name}
              </MDTypography>
            </MDBox>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
