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
import MDButton from "/components/MDButton";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { ErrorMessage, Form, Formik } from "formik";
import { update as updatePartner } from "/actions/partners";

import detailForm from "../schemas/detail-form";
import detailValidations from "../schemas/detail-validations";

export default function DetailFormComponent({
  partner,
  consolidators,
  countries,
}) {
  const {
    formId,
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
  } = detailForm;

  const initialValues = {
    ...partner,
    [country.name]: partner.countryId,
    [isConsolidator.name]: partner.isConsolidator,
    [consolidator.name]: partner.consolidatorId,
  };

  const submitForm = async (values, actions) => {
    await updatePartner(partner.id, values);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={detailValidations}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id={formId} autoComplete="off">
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
                      <Select
                        value={values[consolidator.name]}
                        options={consolidators.filter(
                          (consolidator) => consolidator.id !== partner.id
                        )}
                        optionLabel="company"
                        fieldName={consolidator.name}
                        inputLabel={consolidator.label}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Select
                        value={values[country.name]}
                        options={countries}
                        optionLabel="shortName"
                        fieldName={country.name}
                        inputLabel={country.label}
                        setFieldValue={setFieldValue}
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
                              checked={values[isConsolidator.name]}
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
                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="end">
                    <MDButton
                      color="dark"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Guardar
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
