"use client";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Tooltip,
} from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import moment from "moment";
import { ErrorMessage } from "formik";
import { useEffect } from "react";
import Select from "/components/Select";

export default function First({
  expense,
  formData,
  partners,
  categories,
  invoices,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { name, note, category, date, amount, partner, invoice, billable } =
    formField;

  useEffect(() => {
    console.log("expense", expense);
    setFieldValue(name.name, expense.name);
    setFieldValue(note.name, expense.note);
    setFieldValue(category.name, expense.category?.id ?? null);
    setFieldValue(partner.name, expense.partner?.id ?? null);
    setFieldValue(amount.name, expense.amount);
    setFieldValue(invoice.name, expense.invoice?.id ?? null);
    setFieldValue(date.name, expense.date);
    setFieldValue(billable.name, expense.billable);
  }, [expense, name, note, category, partner, amount, invoice, date, billable]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          value={values[name.name]}
          error={errors.name && touched.name}
          success={name.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={note.name}
          label={
            <MDBox lineHeight={0}>
              {note.label}
              <Tooltip
                sx={{ marginLeft: "15px" }}
                title="Para uso personal - Si se puede facturar, se puede agregar a Nombre a la descripción larga de la factura."
                placement="right-end"
              >
                <MDButton
                  variant="outlined"
                  color="secondary"
                  size="xs"
                  iconOnly
                  circular
                >
                  <Icon sx={{ cursor: "pointer" }}>priority_high</Icon>
                </MDButton>
              </Tooltip>
            </MDBox>
          }
          type={note.type}
          placeholder={note.placeholder}
          value={values[note.name]}
          error={errors.note && touched.note}
          success={note.length > 0 && !errors.note}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[category.name]}
          options={categories}
          optionLabel={(option) => `${option.name}`}
          fieldName={category.name}
          inputLabel={category.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[partner.name]}
          options={partners}
          optionLabel={(option) => `${option.company}`}
          fieldName={partner.name}
          inputLabel={partner.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={amount.name}
          label={amount.label}
          type={amount.type}
          placeholder={amount.placeholder}
          value={values[amount.name]}
          error={errors.amount && touched.amount}
          success={amount.length > 0 && !errors.amount}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[invoice.name]}
          options={invoices}
          optionLabel={(option) => String(option.number)}
          fieldName={invoice.name}
          inputLabel={invoice.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <MDDatePicker
          input={{
            variant: "standard",
            fullWidth: true,
            placeholder: "Fecha de Gastos",
            InputLabelProps: { shrink: true },
          }}
          value={values[date.name]}
          onChange={(value) =>
            setFieldValue(date.name, moment(value[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={date.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[billable.name]}
                    onChange={(e) =>
                      setFieldValue(billable.name, e.target.checked)
                    }
                    name={billable.name}
                  />
                }
                label={billable.label}
              />
            </FormGroup>
          </FormControl>
        </MDBox>
      </Grid>
    </Grid>
  );
}