"use client";

import { Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { Form, Formik } from "formik";
import { update as updatePartner } from "/actions/partners";
import MDSnackbar from "/components/MDSnackbar";

import invoiceForm from "../schemas/invoice-form";
import invoiceValidations from "../schemas/invoice-validations";
import { useState } from "react";

export default function InvoiceFormComponent({ partner, countries }) {
  const {
    formId,
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
  } = invoiceForm;

  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Ha ocurrido un error");

  const initialValues = {
    country_id: partner.countryId,
    company: partner.company,
    consolidator_id: partner.consolidatorId,
    [shippingCity.name]: partner.shippingCity,
    [shippingCountry.name]: partner.shippingCountryId,
    [shippingState.name]: partner.shippingState,
    [shippingZip.name]: partner.shippingZip,
    [shippingStreet.name]: partner.shippingStreet,
    [billingCity.name]: partner.billingCity,
    [billingCountry.name]: partner.billingCountryId,
    [billingState.name]: partner.billingState,
    [billingZip.name]: partner.billingZip,
    [billingStreet.name]: partner.billingStreet,
  };

  const submitForm = async (values, actions) => {
    try {
      await updatePartner(partner.id, values);
    } catch (error) {
      setErrorMsg(error.message);
      setErrorSB(true);
    }
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={invoiceValidations}
        onSubmit={handleSubmit}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id={formId} autoComplete="off">
            <MDSnackbar
              color="error"
              icon="warning"
              title="Error"
              content={errorMsg}
              open={errorSB}
              onClose={() => setErrorSB(false)}
              close={() => setErrorSB(false)}
              bgWhite
            />
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
                  <Select
                    value={values[billingCountry.name]}
                    options={countries}
                    optionLabel={(option) => option.shortName}
                    fieldName={billingCountry.name}
                    inputLabel={billingCountry.label}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    value={values[shippingCountry.name]}
                    options={countries}
                    optionLabel={(option) => option.shortName}
                    fieldName={shippingCountry.name}
                    inputLabel={shippingCountry.label}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="end">
                    <MDButton color="dark" type="submit">
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
