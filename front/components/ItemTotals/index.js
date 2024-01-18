"use client";

import { Grid } from "@mui/material";
import numberFormat from "/utils/numberFormat";
import { useEffect, useState } from "react";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import { ITBMS_TAX_ID, RETAINING_TAX_ID } from "/utils/constants/taxes";

const getTotalWithTaxes = (items) => {
  return items.reduce((acc, item) => acc + getItemTotalWithTaxes(item), 0);
};

const getItemTotalWithTaxes = (item) => {
  return item.taxes.length > 0
    ? item.quantity * item.rate -
        (item.discount ?? 0) *
          (1 +
            item.taxes
              .map((tax) => Number(tax.taxRate))
              .reduce((a, b) => a + b, 0) /
              100)
    : item.quantity * item.rate - (item.discount ?? 0);
};

const getTaxes = (items, type) => {
  return items.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        item.rate *
        (item.taxes.find((tax) => tax.id === type)?.taxRate ?? 0 / 100),
    0
  );
};

const getTotalDiscount = (items) => {
  return items.reduce((acc, item) => acc - item.discount, 0);
};

export default function Totals({ formData }) {
  const { values, formField } = formData;
  const { adjustment } = formField;
  const { items } = values;
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalWithTaxes, setTotalWithTaxes] = useState(0);
  const [itbmsTotalTax, setItbmsTotalTax] = useState(0);
  const [retainingTotalTax, setRetainingTotalTax] = useState(0);
  const [total, setTotal] = useState(0);
  const adjustmentValue = values[adjustment.name];

  useEffect(() => {
    setTotalWithTaxes(getTotalWithTaxes(items));
    setTotalDiscount(getTotalDiscount(items));
    setItbmsTotalTax(getTaxes(items, ITBMS_TAX_ID));
    setRetainingTotalTax(getTaxes(items, RETAINING_TAX_ID));
  }, [items]);

  useEffect(() => {
    setTotal(
      totalDiscount +
        totalWithTaxes +
        itbmsTotalTax +
        retainingTotalTax +
        adjustmentValue
    );
  }, [
    totalDiscount,
    totalWithTaxes,
    itbmsTotalTax,
    retainingTotalTax,
    adjustmentValue,
  ]);

  return (
    <Grid container columnSpacing={5} rowSpacing={1} my={5}>
      <Grid item xs={12} sm={7} />
      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total Neto:</MDTypography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <MDTypography variant="body">
          ${numberFormat(totalWithTaxes)}
        </MDTypography>
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
