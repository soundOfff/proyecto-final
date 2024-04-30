"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import numberFormat from "/utils/numberFormat";
import { useItemTotals } from "/hooks/useItemTotals";

export default function Footer({ invoice }) {
  const { itbmsTotalTax, retainingTotalTax } = useItemTotals({
    items: invoice.items,
    discountType: invoice.discountType,
  });

  return (
    <MDBox p={3} className="footer-print">
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid container columnSpacing={5} rowSpacing={1} my={5}>
              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Total Neto:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(invoice.subtotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Descuento</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(invoice.discountTotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Ajuste</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(invoice.adjustment)}
                </MDTypography>
              </Grid>

              {itbmsTotalTax != 0 && (
                <>
                  <Grid item xs={12} sm={7} />
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="h6">I.T.B.M.S(7.00%)</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <MDTypography variant="body">
                      ${numberFormat(itbmsTotalTax)}
                    </MDTypography>
                  </Grid>
                </>
              )}

              {retainingTotalTax != 0 && (
                <>
                  <Grid item xs={12} sm={7} />
                  <Grid item xs={12} sm={3}>
                    <MDTypography variant="h6">
                      Agente Retenedor(-3.50%)
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <MDTypography variant="body">
                      ${numberFormat(retainingTotalTax)}
                    </MDTypography>
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Total:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(invoice.total)}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Importe a Pagar:</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(invoice.pendingToPay)}
                </MDTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}></Grid>
        <Grid item xs={12} lg={7}>
          <MDBox
            width="100%"
            height={{ xs: "auto", md: "100%" }}
            display="flex"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="flex-end"
            mt={{ xs: 2, md: 0 }}
          >
            <MDButton
              variant="gradient"
              color="dark"
              onClick={() => window.print(this)}
              sx={{ displayPrint: "none" }}
            >
              Imprimir
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
