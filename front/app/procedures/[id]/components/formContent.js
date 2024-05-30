"use client";

import Select from "/components/Select";
import form from "./schemas/form";
import { useCallback, useEffect, useState } from "react";
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
  procedure,
  procedures,
  actions: actionsOptions,
}) {
  const { formField } = form;
  const {
    name,
    description,
    status,
    stepNumber,
    dependencies,
    process,
    actions,
  } = formField;

  const validateStepNumberNotExist = (stepNumber) => {
    let error;

    const proceduresSaved =
      procedure &&
      procedure.process.procedures.filter((p) => p.id != procedure.id);

    if (
      procedure &&
      proceduresSaved.find(
        (procedureSaved) => procedureSaved.stepNumber == stepNumber
      )
    ) {
      error = `El paso número ${stepNumber} ya existe`;
      setFieldError(stepNumber.name, error);
    }

    return error;
  };

  const filteredProcedures = useCallback(() =>
    procedures.filter(
      (p) => p.processId === procedure?.processId && p.id !== procedure.id
    )
  );

  useEffect(() => {
    if (procedure) {
      console.log(procedure.actions);
      setFieldValue(process.name, procedure.processId);
      setFieldValue(name.name, procedure.name);
      setFieldValue(description.name, procedure.description ?? "");
      setFieldValue(stepNumber.name, procedure.stepNumber);
      setFieldValue(status.name, procedure.statusId);
      setFieldValue(dependencies.name, procedure.dependencies ?? []);
      setFieldValue(actions.name, procedure.actions ?? []);
    }
  }, [
    procedure,
    setFieldValue,
    process,
    name,
    description,
    stepNumber,

    status,
  ]);

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
          success={values[name.name]?.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={stepNumber.name}
          label={stepNumber.label}
          type={stepNumber.type}
          placeholder={stepNumber.placeholder}
          value={values[stepNumber.name]}
          error={errors[stepNumber.name] && touched[stepNumber.name]}
          success={
            values[stepNumber.name]?.length > 0 && !errors[stepNumber.name]
          }
          validate={validateStepNumberNotExist}
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          name={description.name}
          label={description.label}
          type={description.type}
          placeholder={description.placeholder}
          value={values[description.name]}
          error={errors[description.name] && touched[description.name]}
          success={
            values[description.name]?.length > 0 && !errors[description.name]
          }
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
          options={filteredProcedures()}
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
          onChange={(e, selectedOption) =>
            setFieldValue(actions.name, selectedOption)
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
