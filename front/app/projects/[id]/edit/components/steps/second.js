"use client";

import { Autocomplete, Grid } from "@mui/material";
import { ErrorMessage } from "formik";
import { useEffect } from "react";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Select from "/components/Select";

export default function Second({
  formData,
  project,
  partners,
  statuses,
  serviceTypes,
  billingTypes,
  members,
}) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { partner, status, serviceType, billingType, selectedMembers } =
    formField;

  useEffect(() => {
    if (project) {
      setFieldValue(partner.name, project.defendant?.id || "");
      setFieldValue(status.name, project.status.id);
      setFieldValue(serviceType.name, project.serviceType?.id || "");
      setFieldValue(billingType.name, project.billingType?.id || "");
      setFieldValue(selectedMembers.name, project.members);
    }
  }, [
    project,
    partner,
    status,
    serviceType,
    billingType,
    selectedMembers,
    setFieldValue,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={4}>
        <Select
          value={values[partner.name]}
          options={partners}
          optionLabel={(option) => option.company ?? option.name}
          fieldName={partner.name}
          inputLabel={partner.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Select
          value={values[status.name]}
          options={statuses}
          optionLabel={(option) => option.label}
          fieldName={status.name}
          inputLabel={status.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Select
          value={values[serviceType.name]}
          options={serviceTypes}
          optionLabel={(option) => option.label}
          fieldName={serviceType.name}
          inputLabel={serviceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[billingType.name]}
          options={billingTypes}
          optionLabel={(option) => option.label}
          fieldName={serviceType.name}
          inputLabel={serviceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          value={values[selectedMembers.name]}
          onChange={(e, members) =>
            setFieldValue(selectedMembers.name, members)
          }
          options={members}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Miembros Del Caso"
              fullWidth
              InputLabelProps={{ shrink: true }}
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
            <ErrorMessage name={selectedMembers.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
