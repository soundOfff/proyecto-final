"use client";

import { Autocomplete, Grid } from "@mui/material";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";
import Select from "/components/Select";

export default function Second({
  formData,
  partners,
  statuses,
  serviceTypes,
  billingTypes,
  members,
}) {
  const { formField, values, setFieldValue } = formData;
  const {
    partner,
    status,
    serviceType,
    responsiblePersonId,
    billingType,
    selectedMembers,
  } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={4}>
        <Select
          value={values[partner.name]}
          options={partners}
          optionLabel={(option) => option.name}
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
          fieldName={billingType.name}
          inputLabel={billingType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[responsiblePersonId.name]}
          options={members}
          optionLabel={(option) => option.name}
          fieldName={responsiblePersonId.name}
          inputLabel={responsiblePersonId.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          onChange={(e, members) =>
            setFieldValue(
              selectedMembers.name,
              members.map((member) => member.id)
            )
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
