"use client";

import { Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import Select from "/components/Select";
import form from "./schemas/form";
import { useEffect } from "react";

export default function First({
  values,
  errors,
  touched,
  setFieldValue,
  projectServiceTypes,
  process,
}) {
  const {
    formField: {
      department,
      description,
      name,
      stepQuantity,
      projectServiceType,
    },
  } = form;

  useEffect(() => {
    if (process) {
      setFieldValue(name.name, process.name || "");
      setFieldValue(description.name, process.description || "");
      setFieldValue(stepQuantity.name, process.stepQuantity || "");
      setFieldValue(department.name, process.department || "");
      setFieldValue(
        projectServiceType.name,
        process.projectServiceType?.id || ""
      );
    }
  }, [
    process,
    setFieldValue,
    name,
    description,
    stepQuantity,
    department,
    projectServiceType,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormField
          value={values[name.name]}
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
      </Grid>

      <Grid item xs={12}>
        <FormField
          value={values[description.name]}
          name={description.name}
          label={description.label}
          type={description.type}
          placeholder={description.placeholder}
          error={errors[description.name] && touched[description.name]}
          success={
            values[description.name]?.length > 0 && !errors[description.name]
          }
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[stepQuantity.name]}
          name={stepQuantity.name}
          label={stepQuantity.label}
          type={stepQuantity.type}
          placeholder={stepQuantity.placeholder}
          error={errors[stepQuantity.name] && touched[stepQuantity.name]}
          success={
            values[stepQuantity.name]?.length > 0 && !errors[stepQuantity.name]
          }
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormField
          value={values[department.name]}
          name={department.name}
          label={department.label}
          type={department.type}
          placeholder={department.placeholder}
          error={errors[department.name] && touched[department.name]}
          success={
            values[department.name]?.length > 0 && !errors[department.name]
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Select
          value={values[projectServiceType.name]}
          options={projectServiceTypes}
          optionLabel={(option) => option.label}
          fieldName={projectServiceType.name}
          inputLabel={projectServiceType.label}
          setFieldValue={setFieldValue}
        />
      </Grid>
    </Grid>
  );
}
