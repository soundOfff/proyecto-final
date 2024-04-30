"use client";

import { Divider, Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

export default function Second({ formData, countries }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    billingStreet,
    billingCity,
    billingState,
    billingZip,
    billingCountry,
    shippingStreet,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    adminNote,
    clientNote,
    terms,
  } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormField
          name={adminNote.name}
          label={adminNote.label}
          type={adminNote.type}
          placeholder={adminNote.placeholder}
          value={values[adminNote.name]}
          error={errors.adminNote && touched.adminNote}
          success={adminNote.length > 0 && !errors.adminNote}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={clientNote.name}
          label={clientNote.label}
          type={clientNote.type}
          placeholder={clientNote.placeholder}
          value={values[clientNote.name]}
          error={errors.clientNote && touched.clientNote}
          success={clientNote.length > 0 && !errors.clientNote}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={terms.name}
          label={terms.label}
          type={terms.type}
          placeholder={terms.placeholder}
          value={values[terms.name]}
          error={errors.terms && touched.terms}
          success={terms.length > 0 && !errors.terms}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="h5" textAlign="center" mt={2}>
          Facturado a
        </MDTypography>
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="h5" textAlign="center" mt={2}>
          Dirección de Envío
        </MDTypography>
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingStreet.name}
          label={billingStreet.label}
          type={billingStreet.type}
          placeholder={billingStreet.placeholder}
          value={values[billingStreet.name]}
          error={errors.billingStreet && touched.billingStreet}
          success={billingStreet.length > 0 && !errors.billingStreet}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingStreet.name}
          label={shippingStreet.label}
          type={shippingStreet.type}
          placeholder={shippingStreet.placeholder}
          value={values[shippingStreet.name]}
          error={errors.shippingStreet && touched.shippingStreet}
          success={shippingStreet.length > 0 && !errors.shippingStreet}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingCity.name}
          label={billingCity.label}
          type={billingCity.type}
          placeholder={billingCity.placeholder}
          value={values[billingCity.name]}
          error={errors.billingCity && touched.billingCity}
          success={billingCity.length > 0 && !errors.billingCity}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingCity.name}
          label={shippingCity.label}
          type={shippingCity.type}
          placeholder={shippingCity.placeholder}
          value={values[shippingCity.name]}
          error={errors.shippingCity && touched.shippingCity}
          success={shippingCity.length > 0 && !errors.shippingCity}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingState.name}
          label={billingState.label}
          type={billingState.type}
          placeholder={billingState.placeholder}
          value={values[billingState.name]}
          error={errors.billingState && touched.billingState}
          success={billingState.length > 0 && !errors.billingState}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingState.name}
          label={shippingState.label}
          type={shippingState.type}
          placeholder={shippingState.placeholder}
          value={values[shippingState.name]}
          error={errors.shippingState && touched.shippingState}
          success={shippingState.length > 0 && !errors.shippingState}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingZip.name}
          label={billingZip.label}
          type={billingZip.type}
          placeholder={billingZip.placeholder}
          value={values[billingZip.name]}
          error={errors.billingZip && touched.billingZip}
          success={billingZip.length > 0 && !errors.billingZip}
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingZip.name}
          label={shippingZip.label}
          type={shippingZip.type}
          placeholder={shippingZip.placeholder}
          value={values[shippingZip.name]}
          error={errors.shippingZip && touched.shippingZip}
          success={shippingZip.length > 0 && !errors.shippingZip}
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
    </Grid>
  );
}
