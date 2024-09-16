"use client";

import form from "./schemas/form";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import { useSearchParams } from "next/navigation";

export default function FormContent({
  values,
  setFieldValue,
  errors,
  touched,
  court,
}) {
  const { formField } = form;
  const { name, number, description } = formField;

  useEffect(() => {
    if (court) {
      setFieldValue(name.name, court.name || "");
      setFieldValue(number.name, court.number || "");
      setFieldValue(description.name, court.description || "");
    }
  }, [court, setFieldValue, name.name, description.name, number.name]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} mt={2}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder="Nombre del juzgado"
          value={values[name.name]}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
      </Grid>
      <Grid item xs={6} mt={2}>
        <FormField
          name={number.name}
          label={number.label}
          type={number.type}
          placeholder="Número del juzgado"
          value={values[number.name]}
          error={errors[number.name] && touched[number.name]}
          success={values[number.name]?.length > 0 && !errors[number.name]}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <FormField
          name={description.name}
          label={description.label}
          type={description.type}
          placeholder="Descripción"
          value={values[description.name]}
          error={errors[description.name] && touched[description.name]}
          success={
            values[description.name]?.length > 0 && !errors[description.name]
          }
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
}
