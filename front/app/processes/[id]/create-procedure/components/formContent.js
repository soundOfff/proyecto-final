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
  errors,
  touched,
  procedures,
}) {
  const { formField } = form;
  const { name, description, responsible, status, stepNumber } = formField;
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    getSelectStaff().then((staffs) => setStaffs(staffs));
  }, []);

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
