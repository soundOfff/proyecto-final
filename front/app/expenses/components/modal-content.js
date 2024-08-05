import { Divider, Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import DefaultItem from "/examples/Items/DefaultItem";
import moneyFormat from "/utils/moneyFormat";
import Invoice from "../../../pagesComponents/pages/account/billing/components/Invoice";
import { DescriptionOutlined } from "@mui/icons-material";
import Link from "next/link";

export default function ModalContent({ expense }) {
  return (
    <MDBox
      sx={{ padding: "0px 10px", my: 3 }}
      display="flex"
      flexDirection="column"
      height="100%"
      alignItems="flex-start"
    >
      <Grid container lineHeight={0} ml={2}>
        <Grid item xs={12} md={6}>
          <MDTypography variant="h4" mr={5} mb={2} noWrap>
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
        <Grid item xs={12} md={6} mt={3}>
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
        {expense.invoice && (
          <Grid item xs={12} md={6} mt={3}>
            <DefaultItem color="dark" title="Factura" />
            <MDBox ml={2}>
              <Invoice
                key={expense.invoice.id}
                date={expense.invoice.date}
                id={`# ${expense.invoice.id}`}
                currency={expense.invoice.currency.name}
              />
            </MDBox>
          </Grid>
        )}

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid item xs={12} mt={3}>
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

        <Divider sx={{ width: "100%" }} />

        <Grid item xs={12} mt={3}>
          <DefaultItem
            color="dark"
            title="Archivos"
            description={expense.files.length ? " " : "Sin archivos"}
          />
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{ gap: 1, mt: 1, px: 2, mb: 3 }}
          >
            {expense.files.map((file) => (
              <MDBox
                key={file.id}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                sx={{
                  border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                  gap: 1,
                  px: 2,
                  py: 1,
                  mb: 1,
                }}
              >
                <DescriptionOutlined fontSize="small" color="dark" />
                <Link href={file.publicUrl} target="_blank">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                    fontSize="small"
                  >
                    {file.subject.length > 20
                      ? file.subject.substring(0, 20) + "..."
                      : file.subject}
                  </MDTypography>
                </Link>
              </MDBox>
            ))}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
