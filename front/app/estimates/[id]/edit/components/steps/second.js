"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import MDBox from "/components/MDBox";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";
import { useEffect } from "react";

export default function Second({
  formData,
  statuses,
  discountTypes,
  recurrings,
  agents,
  estimate,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const {
    isExpiryNotified,
    status,
    reference,
    agent,
    recurring,
    discountType,
    adminNote,
    clientNote,
    terms,
  } = formField;

  useEffect(() => {
    setFieldValue(status.name, estimate.status?.id ?? null);
    setFieldValue(discountType.name, estimate.discountType?.id ?? null);
    setFieldValue(recurring.name, estimate.recurring?.id ?? null);
    setFieldValue(agent.name, estimate.saleAgent?.id ?? null);
    setFieldValue(reference.name, estimate.referenceNo);
    setFieldValue(adminNote.name, estimate.adminNote);
    setFieldValue(clientNote.name, estimate.clientNote);
    setFieldValue(terms.name, estimate.terms);
    setFieldValue(isExpiryNotified.name, estimate.isExpiryNotified);
  }, [
    estimate,
    isExpiryNotified,
    status,
    reference,
    agent,
    recurring,
    discountType,
    adminNote,
    clientNote,
    terms,
    setFieldValue,
  ]);

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
          value={values[discountType.name]}
          options={discountTypes}
          optionLabel={(option) => option.label}
          fieldName={discountType.name}
          inputLabel={discountType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[recurring.name]}
          options={recurrings}
          optionLabel={(option) => option.label}
          fieldName={recurring.name}
          inputLabel={recurring.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Select
          value={values[agent.name]}
          options={agents}
          optionLabel={(option) => option.name}
          fieldName={agent.name}
          inputLabel={agent.label}
          setFieldValue={setFieldValue}
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          value={values[reference.name]}
          name={reference.name}
          label={reference.label}
          type={reference.type}
          placeholder={reference.placeholder}
          error={errors[reference.name] && touched[reference.name]}
          success={
            values[reference.name]?.length > 0 && !errors[reference.name]
          }
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          name={adminNote.name}
          label={adminNote.label}
          type={adminNote.type}
          placeholder={adminNote.placeholder}
          value={values[adminNote.name]}
          error={errors[adminNote.name] && touched[adminNote.name]}
          success={
            values[adminNote.name]?.length > 0 && !errors[adminNote.name]
          }
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
            values[clientNote.name]?.length > 0 && !errors[clientNote.name]
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
          success={values[terms.name]?.length > 0 && !errors[terms.name]}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <MDBox sx={{ display: "flex" }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[isExpiryNotified.name]}
                    onChange={(e) =>
                      setFieldValue(isExpiryNotified.name, e.target.checked)
                    }
                    name={isExpiryNotified.name}
                  />
                }
                label={isExpiryNotified.label}
              />
            </FormGroup>
          </FormControl>
        </MDBox>
      </Grid>
    </Grid>
  );
}
