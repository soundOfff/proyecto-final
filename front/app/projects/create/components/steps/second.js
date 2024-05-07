"use client";

import { Autocomplete, Grid } from "@mui/material";
import MDInput from "/components/MDInput";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { ErrorMessage } from "formik";
import Select from "/components/Select";
import MDDatePicker from "/components/MDDatePicker";
import * as moment from "moment";

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
    defendant,
    plaintiff,
    status,
    serviceType,
    responsiblePersonId,
    billingType,
    selectedMembers,
    startDate,
    deadline,
  } = formField;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[defendant.name]}
          options={partners}
          optionLabel={(option) => option.name}
          fieldName={defendant.name}
          inputLabel={defendant.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[plaintiff.name]}
          options={partners}
          optionLabel={(option) => option.name}
          fieldName={plaintiff.name}
          inputLabel={plaintiff.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
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
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            placeholder: "Fecha De Inicio",
            variant: "standard",
            fullWidth: true,
          }}
          onChange={(date) =>
            setFieldValue(startDate.name, moment(date[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={startDate.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MDDatePicker
          input={{
            placeholder: "Fecha De Entrega",
            variant: "standard",
            fullWidth: true,
          }}
          onChange={(date) =>
            setFieldValue(deadline.name, moment(date[0]).format("YYYY-MM-DD"))
          }
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={deadline.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
