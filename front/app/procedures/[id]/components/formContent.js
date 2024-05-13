"use client";

import Select from "/components/Select";
import form from "./schemas/form";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { select as getSelectStaff } from "/actions/staffs";
import { getAll as getAllStatuses } from "/actions/procedure-statuses";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";

export default function FormContent({
  values,
  setFieldValue,
  setFieldError,
  errors,
  touched,
  procedure,
}) {
  const { formField } = form;
  const { name, description, responsible, status, stepNumber, process } =
    formField;
  const [staffs, setStaffs] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    getSelectStaff().then((staffs) => setStaffs(staffs));
    getAllStatuses().then((response) => setStatuses(response.data.statuses));
  }, []);

  useEffect(() => {
    const proceduresSaved =
      procedure &&
      procedure.process.procedures.filter((p) => p.id != procedure.id);

    if (
      procedure &&
      proceduresSaved.find(
        (procedureSaved) => procedureSaved.stepNumber == values[stepNumber.name]
      )
    ) {
      setFieldError(
        stepNumber.name,
        `El paso número ${values[stepNumber.name]} ya existe`
      );
    }
  }, [values, stepNumber, procedure, setFieldError, errors]);

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
      <Grid item xs={12} sm={6}>
        <Select
          value={values[responsible.name]}
          options={staffs}
          optionLabel={(option) => option.name}
          fieldName={responsible.name}
          inputLabel={responsible.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={values[status.name]}
          options={statuses}
          optionLabel={(option) => option.name}
          fieldName={status.name}
          inputLabel={status.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}
