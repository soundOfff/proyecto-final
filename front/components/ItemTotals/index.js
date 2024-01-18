"use client";

import { Grid } from "@mui/material";
import numberFormat from "/utils/numberFormat";
import { useEffect, useState } from "react";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import { ITBMS_TAX_ID, RETAINING_TAX_ID } from "/utils/constants/taxes";
import { BEFORE_TAX } from "/utils/constants/discountTypes";

export default function Totals({ formData }) {
  const { values, formField, setFieldValue } = formData;
  const { adjustment } = formField;
  const { items, discount_type: discountType } = values;
  const [subtotal, setSubtotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itbmsTotalTax, setItbmsTotalTax] = useState(0);
  const [retainingTotalTax, setRetainingTotalTax] = useState(0);
  const [total, setTotal] = useState(0);
  const adjustmentValue = values[adjustment.name];

  const getSubtotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  };

  const getTotalDiscount = (items) => {
    return items.reduce((acc, item) => acc - item.discount, 0);
  };

  useEffect(() => {
    const getTaxes = (items, type) => {
      return items.reduce((acc, item) => {
        const taxRate = item.taxes.find((tax) => tax.id === type)?.taxRate;
        if (discountType === BEFORE_TAX) {
          return (
            acc +
            (item.quantity * item.rate - item.discount) *
              (taxRate ? taxRate / 100 : 0)
          );
        } else {
          return (
            acc + item.quantity * item.rate * (taxRate ? taxRate / 100 : 0)
          );
        }
      }, 0);
    };

    const subtotal = getSubtotal(items);
    const totalDiscount = getTotalDiscount(items);
    const itbmsTotalTax = getTaxes(items, ITBMS_TAX_ID);
    const retainingTotalTax = getTaxes(items, RETAINING_TAX_ID);
    const total =
      subtotal +
      totalDiscount +
      itbmsTotalTax +
      retainingTotalTax +
      adjustmentValue;

    setSubtotal(subtotal);
    setTotalDiscount(totalDiscount);
    setItbmsTotalTax(itbmsTotalTax);
    setRetainingTotalTax(retainingTotalTax);
    setTotal(total);
    setFieldValue(formField.subtotal.name, subtotal);
    setFieldValue(formField.totalTax.name, itbmsTotalTax + retainingTotalTax);
    setFieldValue(formField.total.name, total);
  }, [items, adjustmentValue, setFieldValue, formField, discountType]);

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
