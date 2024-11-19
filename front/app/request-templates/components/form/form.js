"use client";

import { Autocomplete, Grid, Icon } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import MDInput from "/components/MDInput";

const MODELS = [
  { value: "Project", label: "Caso" },
  { value: "Task", label: "Tarea" },
  { value: "Partner", label: "Cliente" },
  { value: "Staff", label: "Abogado" },
];

export default function FormContent({ formData, formField, requestTemplate }) {
  const { values, errors, touched, setFieldValue } = formData;
  const { name, description, fields, json, model, rows: rowsField } = formField;

  const handleGenerate = () => {
    const mappedJson = values[rowsField.name].map((row) => ({
      [row.name]: row.relationsSelected ?? "",
    }));
    const stringifiedJson = JSON.stringify(
      mappedJson.reduce((a, b) => ({ ...a, ...b }), {}),
      null,
      "\t"
    );
    setFieldValue(json.name, stringifiedJson);
  };

  const handleRefresh = () => {
    const parsedFields = JSON.parse(values[fields.name]);
    const rows = Object.entries(parsedFields).map(([key, value]) => ({
      id: uuidv4(),
      name: key,
      selectedField: value,
    }));
    setFieldValue(rowsField.name, rows);
  };

  useEffect(() => {
    const setInitialValues = async () => {
      if (requestTemplate) {
        setFieldValue(name.name, requestTemplate.name);
        setFieldValue(description.name, requestTemplate.description);
        setFieldValue(fields.name, requestTemplate.fields);
        setFieldValue(json.name, requestTemplate.json);
        setFieldValue(model.name, requestTemplate.model);

        const parsedJson = JSON.parse(requestTemplate.json);
        const rows = await Promise.all(
          Object.entries(parsedJson).map(async ([key, value]) => {
            const relations = value;

            return {
              id: uuidv4(),
              name: key,
              relationsSelected: relations,
            };
          })
        );
        setFieldValue(rowsField.name, rows);
      }
    };
    setInitialValues();
  }, [
    requestTemplate,
    setFieldValue,
    name,
    description,
    fields,
    json,
    model,
    rowsField,
  ]);

  return (
    <MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={4}>
          <MDTypography variant="h5" mt={2}>
            Plantilla de solicitud
          </MDTypography>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="end">
          <MDButton
            variant="text"
            size="large"
            color="dark"
            onClick={handleGenerate}
            sx={{ width: "120px", alignSelf: "end" }}
          >
            Generar
            <Icon sx={{ ml: 1 }}>play_arrow</Icon>
          </MDButton>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="end">
          <MDButton
            variant="text"
            size="large"
            color="info"
            onClick={handleRefresh}
            sx={{ width: "120px", alignSelf: "end" }}
          >
            Actualizar
            <Icon sx={{ ml: 1 }}>cached</Icon>
          </MDButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MDBox display="flex" flexDirection="column" gap={2}>
            <FormField
              name={name.name}
              label={name.label}
              type={name.type}
              placeholder="nombre"
              value={values[name.name]}
              error={errors[name.name] && touched[name.name]}
              success={values[name.name]?.length > 0 && !errors[name.name]}
            />
            <FormField
              name={description.name}
              label={description.label}
              type={description.type}
              placeholder="descripción"
              value={values[description.name]}
              error={errors[description.name] && touched[description.name]}
              success={
                values[description.name]?.length > 0 &&
                !errors[description.name]
              }
              multiline
              rows={2}
            />
            <Autocomplete
              value={
                MODELS.find((option) => option.value === values[model.name]) ||
                ""
              }
              onChange={(e, fieldSelected) => {
                setFieldValue(model.name, fieldSelected?.value ?? "");
              }}
              options={MODELS}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label={model.label}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </MDBox>
        </Grid>
        <Grid item xs={4}>
          <MDBox pt={1.4}>
            <FormField
              name={fields.name}
              label={fields.label}
              type={fields.type}
              placeholder="{ field1: field_value, field2: field_value }"
              value={values[fields.name]}
              error={errors[fields.name] && touched[fields.name]}
              success={values[fields.name]?.length > 0 && !errors[fields.name]}
              multiline
              rows={9}
              noUppercase
            />
          </MDBox>
        </Grid>
        <Grid item xs={4}>
          <MDBox pt={1.4}>
            <FormField
              name={json.name}
              label={json.label}
              type={json.type}
              placeholder="{ field1: field_value, field2: field_value }"
              value={values[json.name]}
              error={errors[json.name] && touched[json.name]}
              success={values[json.name]?.length > 0 && !errors[json.name]}
              multiline
              rows={9}
              noUppercase
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <MDButton variant="contained" color="dark" type="submit">
            Guardar
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}
