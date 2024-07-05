"use client";

import form from "./schemas/form";
import { useEffect } from "react";
import { Autocomplete, Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import { ErrorMessage } from "formik";

import ActionForm from "./actionForm";
import ActionList from "./actionList";
import ReminderForm from "./reminderForm";
import ReminderList from "./reminderList";

export default function FormContent({
  values,
  setFieldValue,
  setFieldError,
  errors,
  touched,
  procedures,
  staffs,
  procedure,
  actionTypes: actionsOptions,
}) {
  const { formField } = form;
  const { name, description, stepNumber, dependencies, actions, reminders } =
    formField;

  const deleteAction = (index) => {
    setFieldValue(actions.name, [
      ...values[actions.name].slice(0, index),
      ...values[actions.name].slice(index + 1),
    ]);
  };

  const deleteReminder = (index) => {
    setFieldValue(reminders.name, [
      ...values[reminders.name].slice(0, index),
      ...values[reminders.name].slice(index + 1),
    ]);
  };

  useEffect(() => {
    if (procedure) {
      setFieldValue(name.name, procedure.name);
      setFieldValue(description.name, procedure.description);
      setFieldValue(stepNumber.name, procedure.stepNumber);
      setFieldValue(dependencies.name, procedure.dependencies || []);
      setFieldValue(actions.name, procedure.actions || []);
      setFieldValue(reminders.name, procedure.reminders || []);
    }
  }, [
    procedure,
    setFieldValue,
    name.name,
    description.name,
    stepNumber.name,
    dependencies.name,
    actions.name,
    reminders.name,
  ]);

  const validateStepNumberNotExist = (stepNumber) => {
    let error;

    if (procedure) {
      const proceduresSaved =
        procedure && procedures.filter((p) => p.id != procedure.id);

      if (
        proceduresSaved.find(
          (procedureSaved) => procedureSaved.stepNumber == stepNumber
        )
      ) {
        error = `El paso número ${stepNumber} ya existe`;
        setFieldError("step_number", error);
      }
    } else {
      const procedureStepNumber = procedures.find(
        (procedure) => procedure.stepNumber == stepNumber
      );
      if (procedureStepNumber) {
        error = `El paso número ${stepNumber} ya existe`;
        setFieldError("step_number", error);
      }
    }

    return error;
  };

  useEffect(() => {
    if (procedure) {
      const proceduresSaved =
        procedure && procedures.filter((p) => p.id != procedure.id);

      if (
        proceduresSaved.find(
          (procedureSaved) => procedureSaved.stepNumber == values.step_number
        )
      ) {
        const error = `El paso número ${values[stepNumber.name]} ya existe`;
        setFieldError(stepNumber.name, error);
      }
    } else {
      const procedureStepNumber = procedures.find(
        (procedure) => procedure.stepNumber == values[stepNumber.name]
      );
      if (procedureStepNumber) {
        setFieldError(
          stepNumber.name,
          `El paso número ${values[stepNumber.name]} ya existe`
        );
      }
    }
  }, [values, stepNumber, procedure, procedures, setFieldError, errors]);

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
        <MDTypography variant="h6" fontWeight="medium">
          Acciones del procedimiento
        </MDTypography>
      </Grid>
      <ActionForm
        options={actionsOptions}
        actions={actions}
        values={values}
        formData={form}
        setFieldValue={setFieldValue}
      />
      <ActionList
        actions={values[actions.name]}
        procedure={procedure}
        options={actionsOptions}
        deleteAction={deleteAction}
      />
      <Grid item xs={12}>
        <MDTypography variant="h6" fontWeight="medium">
          Recordatorios
        </MDTypography>
      </Grid>
      <ReminderForm
        reminders={values[reminders.name]}
        actions={actions}
        values={values}
        remindersField={reminders}
        staffs={staffs}
        setFieldValue={setFieldValue}
      />
      <ReminderList
        reminders={values[reminders.name]}
        staffs={staffs}
        deleteReminder={deleteReminder}
      />
    </Grid>
  );
}
