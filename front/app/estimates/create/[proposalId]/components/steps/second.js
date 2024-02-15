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
  proposal,
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
    setFieldValue(discountType.name, proposal.discountTypeId ?? "");
    setFieldValue(agent.name, proposal.staffAssignedId ?? "");
  }, [
    proposal,
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
          name={reference.name}
          label={reference.label}
          type={reference.type}
          placeholder={reference.placeholder}
          error={errors.reference && touched.reference}
          success={reference.length > 0 && !errors.reference}
        />
      </Grid>

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
