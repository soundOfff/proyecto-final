"use client";

import form from "./schemas/form";
import { useEffect } from "react";
import { Autocomplete, Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import { ErrorMessage } from "formik";

export default function FormContent({
  values,
  setFieldValue,
  setFieldError,
  errors,
  touched,
  procedures,
  actions: actionsOptions,
}) {
  const { formField } = form;
  const { name, description, stepNumber, dependencies, actions } = formField;

  useEffect(() => {
    const procedureStepNumber = procedures.find(
      (procedure) => procedure.stepNumber == values[stepNumber.name]
    );
    if (procedureStepNumber) {
      setFieldError(
        stepNumber.name,
        `El paso número ${values[stepNumber.name]} ya existe`
      );
    }
  }, [values, stepNumber, procedures, setFieldError, errors]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          value={values[name.name]}
          error={errors.name && touched.name}
          success={name.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={stepNumber.name}
          label={stepNumber.label}
          type={stepNumber.type}
          placeholder={stepNumber.placeholder}
          value={values[stepNumber.name]}
          error={errors.stepNumber && touched.stepNumber}
          success={stepNumber.length > 0 && !errors.stepNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={description.name}
          label={description.label}
          type={description.type}
          placeholder={description.placeholder}
          value={values[description.name]}
          error={errors.description && touched.description}
          success={description.length > 0 && !errors.description}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          onChange={(e, selectedTask) =>
            setFieldValue(dependencies.name, selectedTask)
          }
          value={values[dependencies.name]}
          options={procedures}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              key={dependencies.id}
              label={dependencies.label}
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
            <ErrorMessage name={dependencies.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          onChange={(e, selectedAction) =>
            setFieldValue(actions.name, selectedAction)
          }
          value={values[actions.name]}
          options={actionsOptions}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              key={actions.id}
              label={actions.label}
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
            <ErrorMessage name={actions.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
