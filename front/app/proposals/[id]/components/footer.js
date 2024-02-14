"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { ITBMS_TAX_NAME, RETAINING_TAX_NAME } from "/utils/constants/taxes";
import { BEFORE_TAX } from "/utils/constants/discountTypes";
import numberFormat from "/utils/numberFormat";
import { useEffect, useState } from "react";

const getSubtotal = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
};

const getTotalDiscount = (items) => {
  return items.reduce((acc, item) => acc - item.discount, 0);
};

const getTaxes = (items, type, discountType) => {
  return items.reduce((acc, item) => {
    const rate = item.taxes
      ? item.taxes.find((tax) => tax.name == type)?.rate
      : 0;
    if (discountType === BEFORE_TAX) {
      return (
        acc +
        (item.quantity * item.rate - item.discount) * (rate ? rate / 100 : 0)
      );
    } else {
      return acc + item.quantity * item.rate * (rate ? rate / 100 : 0);
    }
  }, 0);
};

export default function Footer({ proposal }) {
  const [itbmsTotalTax, setItbmsTotalTax] = useState(0);
  const [retainingTotalTax, setRetainingTotalTax] = useState(0);

  useEffect(() => {
    const itbmsTotalTax = getTaxes(
      proposal.items,
      ITBMS_TAX_NAME,
      proposal.discountType
    );
    const retainingTotalTax = getTaxes(
      proposal.items,
      RETAINING_TAX_NAME,
      proposal.discountType
    );

    setItbmsTotalTax(itbmsTotalTax);
    setRetainingTotalTax(retainingTotalTax);
  }, [proposal]);

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
                  ${numberFormat(proposal.subtotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Descuento</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(proposal.discountTotal)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={7} />
              <Grid item xs={12} sm={3}>
                <MDTypography variant="h6">Ajuste</MDTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <MDTypography variant="body">
                  ${numberFormat(proposal.adjustment)}
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
                  ${numberFormat(proposal.total)}
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
