"use client";

import { Divider, Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";
import Select from "/components/Select";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { useEffect } from "react";

export default function Second({ formData, countries, creditNote }) {
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

  useEffect(() => {
    if (creditNote) {
      setFieldValue(adminNote.name, creditNote.adminNote ?? "");
      setFieldValue(clientNote.name, creditNote.clientNote ?? "");
      setFieldValue(terms.name, creditNote.terms ?? "");
      setFieldValue(billingStreet.name, creditNote.billingStreet ?? "");
      setFieldValue(billingCity.name, creditNote.billingCity ?? "");
      setFieldValue(billingState.name, creditNote.billingState ?? "");
      setFieldValue(billingZip.name, creditNote.billingZip ?? "");
      setFieldValue(billingCountry.name, creditNote.billingCountryId ?? "");
      setFieldValue(shippingStreet.name, creditNote.shippingStreet ?? "");
      setFieldValue(shippingCity.name, creditNote.shippingCity ?? "");
      setFieldValue(shippingState.name, creditNote.shippingState ?? "");
      setFieldValue(shippingZip.name, creditNote.shippingZip ?? "");
      setFieldValue(shippingCountry.name, creditNote.shippingCountryId ?? "");
    }
  }, [
    creditNote,
    setFieldValue,
    adminNote,
    clientNote,
    terms,
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
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormField
          name={adminNote.name}
          label={adminNote.label}
          type={adminNote.type}
          placeholder={adminNote.placeholder}
          value={values[adminNote.name]}
          error={errors[adminNote.name] && touched[adminNote.name]}
          success={values[adminNote.name].length > 0 && !errors[adminNote.name]}
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
          error={errors[clientNote.name] && touched[clientNote.name]}
          success={
            values[clientNote.name].length > 0 && !errors[clientNote.name]
          }
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
          error={errors[terms.name] && touched[terms.name]}
          success={values[terms.name].length > 0 && !errors[terms.name]}
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
          error={errors[billingStreet.name] && touched[billingStreet.name]}
          success={
            values[billingStreet.name].length > 0 && !errors[billingStreet.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingStreet.name}
          label={shippingStreet.label}
          type={shippingStreet.type}
          placeholder={shippingStreet.placeholder}
          value={values[shippingStreet.name]}
          error={errors[shippingStreet.name] && touched[shippingStreet.name]}
          success={
            [shippingStreet.name].length > 0 && !errors[shippingStreet.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingCity.name}
          label={billingCity.label}
          type={billingCity.type}
          placeholder={billingCity.placeholder}
          value={values[billingCity.name]}
          error={errors[billingCity.name] && touched[billingCity.name]}
          success={
            values[billingCity.name].length > 0 && !errors[billingCity.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingCity.name}
          label={shippingCity.label}
          type={shippingCity.type}
          placeholder={shippingCity.placeholder}
          value={values[shippingCity.name]}
          error={errors[shippingCity.name] && touched[shippingCity.name]}
          success={
            values[shippingCity.name].length > 0 && !errors[shippingCity.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingState.name}
          label={billingState.label}
          type={billingState.type}
          placeholder={billingState.placeholder}
          value={values[billingState.name]}
          error={errors[billingState.name] && touched[billingState.name]}
          success={
            values[billingState.name].length > 0 && !errors[billingState.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingState.name}
          label={shippingState.label}
          type={shippingState.type}
          placeholder={shippingState.placeholder}
          value={values[shippingState.name]}
          error={errors[shippingState.name] && touched[shippingState.name]}
          success={
            values[shippingState.name].length > 0 && !errors[shippingState.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={billingZip.name}
          label={billingZip.label}
          type={billingZip.type}
          placeholder={billingZip.placeholder}
          value={values[billingZip.name]}
          error={errors[billingZip.name] && touched[billingZip.name]}
          success={
            values[billingZip.name].length > 0 && !errors[billingZip.name]
          }
        />
      </Grid>
      <Grid item xs={6}>
        <FormField
          name={shippingZip.name}
          label={shippingZip.label}
          type={shippingZip.type}
          placeholder={shippingZip.placeholder}
          value={values[shippingZip.name]}
          error={errors[shippingZip.name] && touched[shippingZip.name]}
          success={
            values[shippingZip.name].length > 0 && !errors[shippingZip.name]
          }
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
