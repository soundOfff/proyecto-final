import { Divider, Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import DefaultItem from "/examples/Items/DefaultItem";
import moneyFormat from "/utils/moneyFormat";
import Invoice from "../../../pagesComponents/pages/account/billing/components/Invoice";

export default function ModalContent({ expense }) {
  return (
    <MDBox
      sx={{ padding: "0px 10px" }}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      height="100%"
      alignContent="center"
    >
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
          md={3}
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
          md={3}
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
      </Grid>

      <Divider sx={{ width: "100%" }} />

      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Cliente"
            description={
              expense.partner
                ? expense.partner.company ?? "Sin Nombre"
                : "Sin cliente"
            }
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem color="dark" title="Factura" />
          <MDBox ml={2}>
            <Invoice
              date={expense?.invoice.date}
              id={`# ${expense?.invoice.id}`}
              key={expense?.invoice.id}
              currency={expense?.invoice.currency.name}
            />
          </MDBox>
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} mt={3}>
          <MDBox ml={2} mt={0.5} lineHeight={1.4}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              Caso
            </MDTypography>
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              textAlign="center"
            >
              {expense.project?.name ??
                "No hay descripcion del caso disponible"}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
