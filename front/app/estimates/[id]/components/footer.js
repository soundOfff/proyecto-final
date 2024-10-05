"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import numberFormat from "/utils/numberFormat";
import { toInvoice } from "/actions/estimates";
import { useItemTotals } from "/hooks/useItemTotals";
import usePrint from "/hooks/usePrint";

export default function Footer({ estimate }) {
  const { itbmsTotalTax, retainingTotalTax } = useItemTotals({
    items: estimate.items,
    discountType: estimate.discountType,
  });
  const { isGeneratingPdf, handlePrint } = usePrint({
    documentType: "estimate",
    documentId: estimate.id,
  });

  const handleToInvoice = async () => {
    await toInvoice(estimate.id);
  };

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
                  ${numberFormat(estimate.subtotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Descuento</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(estimate.discountTotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Ajuste</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(estimate.adjustment)}
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
                  ${numberFormat(estimate.total)}
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
            {!estimate.invoiceId && (
              <MDButton
                variant="gradient"
                color="success"
                onClick={handleToInvoice}
                sx={{ mr: 2, displayPrint: "none" }}
              >
                Convertir a Factura
              </MDButton>
            )}
            <MDButton
              variant="gradient"
              color="dark"
              onClick={handlePrint}
              disabled={isGeneratingPdf}
              sx={{ displayPrint: "none" }}
            >
              {isGeneratingPdf ? "Generando..." : "Imprimir"}
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={3}>
        <MDTypography variant="h6">Notas:</MDTypography>
        <MDTypography variant="caption" color="text" sx={{ fontSize: "12px" }}>
          {estimate.clientNote ?? "No hay notas"}
        </MDTypography>
        <MDTypography mt={3} variant="h6">
          Terminos y condiciones:
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {estimate.terms ?? "No hay términos y condiciones"}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
