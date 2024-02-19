"use client";

import { Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";
import { useEffect } from "react";

export default function Second({
  formData,
  proposal,
  statuses,
  staffs,
  countries,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    status,
    staffAssigned,
    proposalTo,
    country,
    address,
    state,
    city,
    zip,
    email,
    phone,
  } = formField;

  useEffect(() => {
    setFieldValue(status.name, proposal.statusId);
    setFieldValue(staffAssigned.name, proposal.staffAssignedId);
  }, [proposal, status, staffAssigned, setFieldValue]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[status.name]}
          options={statuses}
          optionLabel={(option) => option.label}
          fieldName={status.name}
          inputLabel={status.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[staffAssigned.name]}
          options={staffs}
          optionLabel={(option) => option.name}
          fieldName={staffAssigned.name}
          inputLabel={staffAssigned.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={proposalTo.name}
          label={proposalTo.label}
          type={proposalTo.type}
          placeholder={proposalTo.placeholder}
          error={errors.proposalTo && touched.proposalTo}
          success={proposalTo.length > 0 && !errors.proposalTo}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={address.name}
          label={address.label}
          type={address.type}
          placeholder={address.placeholder}
          error={errors.address && touched.address}
          success={address.length > 0 && !errors.address}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={city.name}
          label={city.label}
          type={city.type}
          placeholder={city.placeholder}
          error={errors.city && touched.city}
          success={city.length > 0 && !errors.city}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={state.name}
          label={state.label}
          type={state.type}
          placeholder={state.placeholder}
          error={errors.state && touched.state}
          success={state.length > 0 && !errors.state}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[country.name]}
          options={countries}
          optionLabel={(option) => option.shortName}
          fieldName={country.name}
          inputLabel={country.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={zip.name}
          label={zip.label}
          type={zip.type}
          placeholder={zip.placeholder}
          error={errors.zip && touched.zip}
          success={zip.length > 0 && !errors.zip}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={email.name}
          label={email.label}
          type={email.type}
          placeholder={email.placeholder}
          error={errors.email && touched.email}
          success={email.length > 0 && !errors.email}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          name={phone.name}
          label={phone.label}
          type={phone.type}
          placeholder={phone.placeholder}
          error={errors.phone && touched.phone}
          success={phone.length > 0 && !errors.phone}
        />
      </Grid>
    </Grid>
  );
}
