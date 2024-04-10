"use client";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { ErrorMessage } from "formik";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { CUSTOM, RECURRING_TYPES } from "/utils/constants/repeats";
import { useEffect } from "react";
import Select from "/components/Select";

export default function Second({
  expense,
  formData,
  currencies,
  taxes,
  paymentMethods,
  repeats,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    currency,
    tax,
    tax2,
    paymentMethod,
    reference,
    repeat,
    recurring,
    recurringType,
    isInfinite,
    totalCycles,
    createInvoiceBillable,
    sendInvoiceToCustomer,
  } = formField;

  useEffect(() => {
    setFieldValue(currency.name, expense.currency?.id ?? null);
    setFieldValue(tax.name, expense.tax_id ?? null);
    setFieldValue(tax2.name, expense.tax2_id ?? null);
    setFieldValue(paymentMethod.name, expense.paymentMethod?.id ?? null);
    setFieldValue(reference.name, expense.reference);
    setFieldValue(repeat.name, expense.repeat_id);
    setFieldValue(recurring.name, expense.recurring);
    setFieldValue(isInfinite.name, expense.is_infinite);
    setFieldValue(totalCycles.name, expense.total_cycles ?? "");
    setFieldValue(recurringType.name, Number(expense.recurring_type));
    setFieldValue(createInvoiceBillable.name, expense.create_invoice_billable);
    setFieldValue(sendInvoiceToCustomer.name, expense.send_invoice_to_customer);
  }, [
    expense,
    currency,
    tax,
    tax2,
    paymentMethod,
    reference,
    repeat,
    recurring,
    recurringType,
    isInfinite,
    totalCycles,
    createInvoiceBillable,
    sendInvoiceToCustomer,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Select
          value={values[currency.name]}
          options={currencies}
          optionLabel={(option) => option.name}
          fieldName={currency.name}
          inputLabel={currency.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[tax.name]}
          options={taxes}
          optionLabel={(option) => `${option.name} | ${option.rate}%`}
          fieldName={tax.name}
          inputLabel={tax.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[tax2.name]}
          options={taxes}
          optionLabel={(option) => `${option.name} | ${option.rate}%`}
          fieldName={tax2.name}
          inputLabel={tax2.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[paymentMethod.name]}
          options={paymentMethods}
          optionLabel={(option) => option.label}
          fieldName={paymentMethod.name}
          inputLabel={paymentMethod.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={reference.name}
          label={reference.label}
          type={reference.type}
          value={values[reference.name]}
          placeholder={reference.placeholder}
          error={errors.reference && touched.reference}
          success={reference.length > 0 && !errors.reference}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          value={values[repeat.name]}
          options={repeats}
          optionLabel={(option) => option.label}
          fieldName={repeat.name}
          inputLabel={repeat.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      {values[repeat.name] === CUSTOM && (
        <>
          <Grid item xs={12} sm={6}>
            <FormField
              name={recurring.name}
              type={recurring.type}
              label=""
              placeholder={recurring.placeholder}
              value={values[recurring.name]}
              error={errors.recurring && touched.recurring}
              success={recurring.length > 0 && !errors.recurring}
              box={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={RECURRING_TYPES.find(
                (recurring_type) =>
                  recurring_type.id === values[recurringType.name]
              )}
              onChange={(e, recurringTypeSelected) =>
                setFieldValue(recurringType.name, recurringTypeSelected.id)
              }
              options={RECURRING_TYPES}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
        </>
      )}
      {values[repeat.name] && (
        <Grid item xs={12}>
          <MDBox display="flex" alignItems="center">
            <FormField
              name={totalCycles.name}
              label={totalCycles.label}
              type={totalCycles.type}
              placeholder={totalCycles.placeholder}
              error={errors.totalCycles && touched.totalCycles}
              success={totalCycles.length > 0 && !errors.totalCycles}
              box={{ width: "80%" }}
              disabled={values[isInfinite.name]}
            />
            <MDBox ml={5}>
              <FormControlLabel
                control={<Checkbox />}
                checked={values[isInfinite.name]}
                onChange={(e) => {
                  setFieldValue(isInfinite.name, Boolean(e.target.checked));
                  setFieldValue(totalCycles.name, "");
                }}
                label="Infinito"
                labelPlacement="end"
                sx={{ display: "flex", flexWrap: "nowrap" }}
              />
            </MDBox>
          </MDBox>
        </Grid>
      )}
      <Grid item xs={12}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[createInvoiceBillable.name]}
                    onChange={(e) =>
                      setFieldValue(
                        createInvoiceBillable.name,
                        e.target.checked
                      )
                    }
                    name={createInvoiceBillable.name}
                  />
                }
                label={createInvoiceBillable.label}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[sendInvoiceToCustomer.name]}
                    onChange={(e) =>
                      setFieldValue(
                        sendInvoiceToCustomer.name,
                        e.target.checked
                      )
                    }
                    name={sendInvoiceToCustomer.name}
                  />
                }
                label={sendInvoiceToCustomer.label}
              />
            </FormGroup>
          </FormControl>
        </MDBox>
      </Grid>
    </Grid>
  );
}