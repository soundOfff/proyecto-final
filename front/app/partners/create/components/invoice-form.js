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
      invoice: {
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
              value={values[billingStreet.name]}
              autoComplete="off"
              label={billingStreet.label}
              placeholder={billingStreet.placeholder}
              name={billingStreet.name}
              type={billingStreet.type}
              error={errors[billingStreet.name] && touched[billingStreet.name]}
              success={
                values[billingStreet.name].length > 0 &&
                !errors[billingStreet.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[shippingStreet.name]}
              label={shippingStreet.label}
              placeholder={shippingStreet.placeholder}
              name={shippingStreet.name}
              type={shippingStreet.type}
              error={
                errors[shippingStreet.name] && touched[shippingStreet.name]
              }
              success={
                values[shippingStreet.name].length > 0 &&
                !errors[shippingStreet.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[billingCity.name]}
              label={billingCity.label}
              placeholder={billingCity.placeholder}
              name={billingCity.name}
              type={billingCity.type}
              error={errors[billingCity.name] && touched[billingCity.name]}
              success={
                values[billingCity.name].length > 0 && !errors[billingCity.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[shippingCity.name]}
              label={shippingCity.label}
              placeholder={shippingCity.placeholder}
              name={shippingCity.name}
              type={shippingCity.type}
              error={errors[shippingCity.name] && touched[shippingCity.name]}
              success={
                values[shippingCity.name].length > 0 &&
                !errors[shippingCity.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[billingState.name]}
              label={billingState.label}
              placeholder={billingState.placeholder}
              name={billingState.name}
              type={billingState.type}
              error={errors[billingState.name] && touched[billingState.name]}
              success={
                values[billingState.name].length > 0 &&
                !errors[billingState.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[shippingState.name]}
              label={shippingState.label}
              placeholder={shippingState.placeholder}
              name={shippingState.name}
              type={shippingState.type}
              error={errors[shippingState.name] && touched[shippingState.name]}
              success={
                values[shippingState.name].length > 0 &&
                !errors[shippingState.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[billingZip.name]}
              label={billingZip.label}
              placeholder={billingZip.placeholder}
              name={billingZip.name}
              type={billingZip.type}
              error={errors[billingZip.name] && touched[billingZip.name]}
              success={
                values[billingZip.name].length > 0 && !errors[billingZip.name]
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              value={values[shippingZip.name]}
              label={shippingZip.label}
              placeholder={shippingZip.placeholder}
              name={shippingZip.name}
              type={shippingZip.type}
              error={errors[shippingZip.name] && touched[shippingZip.name]}
              success={
                values[shippingZip.name].length > 0 && !errors[shippingZip.name]
              }
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
