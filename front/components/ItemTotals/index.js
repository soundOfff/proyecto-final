"use client";

import { Grid } from "@mui/material";
import numberFormat from "/utils/numberFormat";
import { useEffect } from "react";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import { useItemTotals } from "/hooks/useItemTotals";

export default function Totals({ formData }) {
  const { values, formField, setFieldValue } = formData;
  const { adjustment } = formField;
  const {
    items,
    discount_type: discountType,
    adjustment: adjustmentValue,
  } = values;
  const { subtotal, totalDiscount, itbmsTotalTax, retainingTotalTax, total } =
    useItemTotals({ items, discountType, adjustmentValue });

  useEffect(() => {
    setFieldValue(formField.subtotal.name, subtotal);
    setFieldValue(formField.totalTax.name, itbmsTotalTax + retainingTotalTax);
    setFieldValue(formField.total.name, total);
    setFieldValue(formField.totalDiscount.name, totalDiscount);
    setFieldValue(formField.adjustment.name, adjustmentValue);
  }, [
    subtotal,
    totalDiscount,
    itbmsTotalTax,
    retainingTotalTax,
    adjustmentValue,
    total,
    formField,
    setFieldValue,
  ]);

  return (
    <Grid container columnSpacing={5} rowSpacing={1} my={5}>
      <Grid item xs={12} sm={7} />
      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total Neto:</MDTypography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <MDTypography variant="body">${numberFormat(subtotal)}</MDTypography>
      </Grid>

      <Grid item xs={12} sm={7} />
      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Descuento</MDTypography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <MDTypography variant="body">
          ${numberFormat(totalDiscount)}
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
            <MDTypography variant="h6">Agente Retenedor(-3.50%)</MDTypography>
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
        <FormField
          as={MDInput}
          name={adjustment.name}
          label={adjustment.label}
          type={adjustment.type}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <MDTypography variant="body">
          {`$${
            values[adjustment.name] != ""
              ? numberFormat(values[adjustment.name])
              : "0"
          }`}
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={7} />
      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total:</MDTypography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <MDTypography variant="h6">${numberFormat(total)}</MDTypography>
      </Grid>
    </Grid>
  );
}
