"use client";

import { Autocomplete, Grid } from "@mui/material";
import FormField from "./FormField";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { useFormik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import * as Yup from "yup";
import { useEffect } from "react";

export default function ItemForm({ formData, item, taxesData, types }) {
  const units = ["Cantidad", "Horas", "Cantidad/Horas"];
  const {
    values: externalValues,
    formField,
    setFieldValue: setFieldValueExternal,
  } = formData;
  const {
    description,
    longDescription,
    quantity,
    rate,
    taxes,
    discount,
    type,
    unit,
    items,
  } = formField;

  const addItemValidationSchema = Yup.object().shape({
    [description.name]: Yup.string().required(description.errorMsg),
    [quantity.name]: Yup.number()
      .min(1, "Debe ser mayor que 0")
      .required(quantity.errorMsg),
    [rate.name]: Yup.number().required(rate.errorMsg),
    [longDescription.name]: Yup.string(),
    [type.name]: Yup.string(),
    [taxes.name]: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        taxRate: Yup.number(),
      })
    ),
    [discount.name]: Yup.number().nullable(),
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      [description.name]: "",
      [longDescription.name]: "",
      [quantity.name]: "",
      [rate.name]: "",
      [discount.name]: "",
      [type.name]: "",
      [unit.name]: "",
      [taxes.name]: [],
    },
    validationSchema: addItemValidationSchema,
    onSubmit: (values) => {
      setFieldValueExternal(items.name, [
        ...externalValues.items,
        {
          description: values[description.name],
          long_description: values[longDescription.name],
          type: values[type.name],
          quantity: values[quantity.name],
          rate: values[rate.name],
          taxes: values[taxes.name],
          discount: values[discount.name],
          unit: values[unit.name],
        },
      ]);
      setFieldValue(description.name, "");
      setFieldValue(longDescription.name, "");
      setFieldValue(quantity.name, "");
      setFieldValue(rate.name, "");
      setFieldValue(type.name, "");
      setFieldValue(taxes.name, []);
      setFieldValue(discount.name, "");
      setFieldValue(unit.name, "");
    },
  });

  useEffect(() => {
    if (item) {
      setFieldValue(description.name, item.description);
      setFieldValue(longDescription.name, item.long_description);
      setFieldValue(rate.name, item.rate);
    }
  }, [item, description, longDescription, rate, setFieldValue]);

  return (
    <>
      <Grid item xs={4}>
        <MDBox display="flex" justifyContent="end">
          <FormControl>
            <FormLabel>{unit.label}</FormLabel>
            <RadioGroup row name={unit.name}>
              {units.map((unit) => (
                <FormControlLabel
                  key={unit}
                  value={unit}
                  control={
                    <Radio
                      onChange={(e) => {
                        setFieldValueExternal(
                          formField.unit.name,
                          e.target.value
                        );
                      }}
                    />
                  }
                  label={unit}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormField
          name={description.name}
          label={description.label}
          type={description.type}
          errors={errors}
          touched={touched}
          success={description.length > 0 && !errors.description}
          value={values[description.name]}
          onChange={(e) => setFieldValue(description.name, e.target.value)}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormField
          name={longDescription.name}
          label={longDescription.label}
          type={longDescription.type}
          errors={errors}
          touched={touched}
          success={longDescription.length > 0 && !errors.longDescription}
          value={values[longDescription.name]}
          onChange={(e) => setFieldValue(longDescription.name, e.target.value)}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Autocomplete
          key={`${externalValues.items.length}-types`}
          onChange={(e, typeSelected) =>
            setFieldValue(type.name, typeSelected?.label)
          }
          options={types}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={type.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <FormField
          name={quantity.name}
          label={quantity.label}
          type={quantity.type}
          errors={errors}
          touched={touched}
          success={quantity.length > 0 && !errors.quantity}
          value={values[quantity.name]}
          onChange={(e) => setFieldValue(quantity.name, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <FormField
          name={rate.name}
          label={rate.label}
          type={rate.type}
          errors={errors}
          touched={touched}
          success={rate.length > 0 && !errors.rate}
          value={values[rate.name]}
          onChange={(e) => setFieldValue(rate.name, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Autocomplete
          key={`${externalValues.items.length}-taxes`}
          multiple
          onChange={(e, selected) => setFieldValue(taxes.name, selected)}
          options={taxesData}
          getOptionLabel={(option) => `${option.taxRate}% | ${option.name}`}
          renderOption={(props, option) => (
            <MDBox {...props}>
              <MDTypography variant="body" display="inline">
                {option.taxRate}%
              </MDTypography>
              <MDTypography
                variant="caption"
                display="inline"
                color="text"
                ml={2}
              >
                {option.name}
              </MDTypography>
            </MDBox>
          )}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label={taxes.label}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errors[taxes.name] && touched[taxes.name]
              ? errors[taxes.name]
              : null}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={1}>
        <FormField
          name={discount.name}
          placeholder={discount.placeholder}
          label={discount.label}
          type={discount.type}
          errors={errors}
          touched={touched}
          success={discount.length > 0 && !errors.discount}
          value={values[discount.name]}
          onChange={(e) => setFieldValue(discount.name, e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <MDButton onClick={handleSubmit}>Agregar</MDButton>
      </Grid>
    </>
  );
}
