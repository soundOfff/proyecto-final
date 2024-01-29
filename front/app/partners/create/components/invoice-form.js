"use client";

import { Autocomplete, Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { ErrorMessage } from "formik";
import form from "../schemas/form";

export default function InvoiceFormComponent({
  countries,
  errors,
  values,
  touched,
  setFieldValue,
}) {
  const {
    formField: {
      shippingCity,
      shippingCountry,
      shippingState,
      shippingZip,
      shippingStreet,
      billingCity,
      billingCountry,
      billingState,
      billingZip,
      billingStreet,
    },
  } = form;

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <MDTypography variant="h5" textAlign="center" my={5}>
            Dirección de Cobro
          </MDTypography>
        </Grid>
        <Grid item xs={6}>
          <MDTypography variant="h5" textAlign="center" my={5}>
            Dirección de Envío
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              label={billingStreet.label}
              placeholder={billingStreet.placeholder}
              name={billingStreet.name}
              type={billingStreet.type}
              error={errors.name && touched.name}
              success={billingStreet.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={shippingStreet.label}
              placeholder={shippingStreet.placeholder}
              name={shippingStreet.name}
              type={shippingStreet.type}
              error={errors.name && touched.name}
              success={shippingStreet.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={billingCity.label}
              placeholder={billingCity.placeholder}
              name={billingCity.name}
              type={billingCity.type}
              error={errors.name && touched.name}
              success={billingCity.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={shippingCity.label}
              placeholder={shippingCity.placeholder}
              name={shippingCity.name}
              type={shippingCity.type}
              error={errors.name && touched.name}
              success={shippingCity.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={billingState.label}
              placeholder={billingState.placeholder}
              name={billingState.name}
              type={billingState.type}
              error={errors.name && touched.name}
              success={billingState.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={shippingState.label}
              placeholder={shippingState.placeholder}
              name={shippingState.name}
              type={shippingState.type}
              error={errors.name && touched.name}
              success={shippingState.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={billingZip.label}
              placeholder={billingZip.placeholder}
              name={billingZip.name}
              type={billingZip.type}
              error={errors.name && touched.name}
              success={billingZip.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label={shippingZip.label}
              placeholder={shippingZip.placeholder}
              name={shippingZip.name}
              type={shippingZip.type}
              error={errors.name && touched.name}
              success={shippingZip.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              value={
                countries.find((c) => c.id == values[billingCountry.name]) ??
                null
              }
              onChange={(e, countrySelected) =>
                setFieldValue(billingCountry.name, countrySelected?.id ?? null)
              }
              options={countries}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.shortName}
              renderInput={(params) => (
                <>
                  <MDInput
                    {...params}
                    variant="standard"
                    label={billingCountry.label}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ ...params.inputProps }}
                  />
                </>
              )}
            />
            <MDBox mt={0.75}>
              <MDTypography
                component="div"
                variant="caption"
                color="error"
                fontWeight="regular"
              >
                <ErrorMessage name={billingCountry.name} />
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              value={
                countries.find((c) => c.id == values[shippingCountry.name]) ??
                null
              }
              onChange={(e, countrySelected) =>
                setFieldValue(shippingCountry.name, countrySelected?.id ?? null)
              }
              options={countries}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.shortName}
              renderInput={(params) => (
                <>
                  <MDInput
                    {...params}
                    variant="standard"
                    label={shippingCountry.label}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ ...params.inputProps }}
                  />
                </>
              )}
            />
            <MDBox mt={0.75}>
              <MDTypography
                component="div"
                variant="caption"
                color="error"
                fontWeight="regular"
              >
                <ErrorMessage name={shippingCountry.name} />
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}
