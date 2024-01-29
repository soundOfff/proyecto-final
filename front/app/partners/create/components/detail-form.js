"use client";

import {
  Autocomplete,
  Card,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
} from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { ErrorMessage } from "formik";
import form from "../schemas/form";

export default function DetailFormComponent({
  consolidators,
  countries,
  errors,
  values,
  touched,
  setFieldValue,
}) {
  const {
    formField: {
      company,
      address,
      state,
      city,
      consolidator,
      isConsolidator,
      country,
      phone,
      website,
      zip,
    },
  } = form;

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Editar Cliente</MDTypography>
      </MDBox>
      <MDBox pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label={company.label}
              placeholder={company.placeholder}
              name={company.name}
              type={company.type}
              error={errors.name && touched.name}
              success={company.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={address.label}
              placeholder={address.placeholder}
              name={address.name}
              type={address.type}
              error={errors.name && touched.name}
              success={address.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={city.label}
              placeholder={city.placeholder}
              name={city.name}
              type={city.type}
              error={errors.name && touched.name}
              success={city.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={state.label}
              placeholder={state.placeholder}
              name={state.name}
              type={state.type}
              error={errors.name && touched.name}
              success={state.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  value={
                    consolidators.find(
                      (c) => c.id == values[consolidator.name]
                    ) ?? null
                  }
                  onChange={(e, consolidatorSelected) =>
                    setFieldValue(
                      consolidator.name,
                      consolidatorSelected?.id ?? null
                    )
                  }
                  options={consolidators}
                  getOptionLabel={(option) => option?.company ?? ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id == value.id || !value
                  }
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      variant="standard"
                      label={consolidator.label}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ ...params.inputProps }}
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
                    <ErrorMessage name={consolidator.name} />
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  value={
                    countries.find((c) => c.id == values[country.name]) ?? null
                  }
                  onChange={(e, countrySelected) =>
                    setFieldValue(country.name, countrySelected?.id ?? "")
                  }
                  options={countries}
                  isOptionEqualToValue={(option, value) =>
                    option.id == value.id || !value
                  }
                  getOptionLabel={(option) => option?.shortName ?? ""}
                  renderInput={(params) => (
                    <>
                      <MDInput
                        {...params}
                        variant="standard"
                        label={country.label}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ ...params.inputProps }}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                display="flex"
                justifyContent="center"
                alignItems="end"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultValue={values.isConsolidator}
                        onChange={(e) =>
                          setFieldValue(
                            isConsolidator.name,
                            e.currentTarget.checked
                          )
                        }
                      />
                    }
                    label={consolidator.label}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={website.label}
              name={website.name}
              type={website.type}
              error={errors.name && touched.name}
              success={website.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={zip.label}
              name={zip.name}
              type={zip.type}
              error={errors.name && touched.name}
              success={zip.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label={phone.label}
              placeholder={phone.placeholder}
              name={phone.name}
              type={phone.type}
              value={values.phoneNumber}
              error={errors.name && touched.name}
              success={phone.length > 0 && !errors.name}
            />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}
