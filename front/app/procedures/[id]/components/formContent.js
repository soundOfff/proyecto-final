"use client";

import Select from "/components/Select";
import form from "./schemas/form";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { select as getSelectStaff } from "/actions/staffs";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

export default function FormContent({
  values,
  setFieldValue,
  setFieldError,
  setFieldTouched,
  errors,
  touched,
  procedure,
}) {
  const { formField } = form;
  const { name, description, responsible, status, stepNumber, process } =
    formField;
  const [staffs, setStaffs] = useState([]);

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

  useEffect(() => {
    getSelectStaff().then((staffs) => setStaffs(staffs));
  }, []);

  useEffect(() => {
    if (procedure) {
      setFieldValue(process.name, procedure.processId);
      setFieldValue(name.name, procedure.name);
      setFieldValue(description.name, procedure.description ?? "");
      setFieldValue(stepNumber.name, procedure.stepNumber);
      setFieldValue(responsible.name, procedure.responsibleId ?? "");
      setFieldValue(status.name, procedure.statusId);
    }
  }, [
    procedure,
    setFieldValue,
    process,
    name,
    description,
    stepNumber,
    responsible,
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
          success={values[name.name].length > 0 && !errors.name}
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
            values[stepNumber.name].length > 0 && !errors[stepNumber.name]
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
            values[description.name].length > 0 && !errors[description.name]
          }
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          value={values[responsible.name]}
          options={staffs}
          optionLabel={(option) => option.name}
          fieldName={responsible.name}
          inputLabel={responsible.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}
