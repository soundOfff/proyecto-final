"use client";
// @mui material components
import { Card, Grid } from "@mui/material";
import { useFormik } from "formik";

import FormField from "./form-field";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

export const dynamic = "force-dynamic";

const newInfo = {
  formId: "new-template",
  formField: {
    doccasemblePackage: {
      name: "package",
      label: "Nombre del paquete",
      type: "text",
    },
    filename: {
      name: "filename",
      label: "Nombre del archivo yml",
      type: "text",
    },
    doccasembleIndex: {
      name: "doccasemble_index",
      label: "Índice de Doccasemble",
      type: "text",
    },
  },
};

export default function FormInfo() {
  const { formField } = newInfo;
  const { doccasemblePackage, filename, doccasembleIndex } = formField;

  const { values, errors, setFieldValue, touched } = useFormik({
    initialValues: {
      [doccasemblePackage.name]: "",
      [filename.name]: "",
      [doccasembleIndex.name]: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <MDBox mb={3}>
      <Card sx={{ p: 3 }}>
        <MDTypography variant="h5" gutterBottom>
          Información del template
        </MDTypography>
        <Grid container spacing={2} py={2}>
          <Grid item xs={12}>
            <FormField
              value={values[doccasemblePackage.name]}
              onChange={(e) =>
                setFieldValue(doccasemblePackage.name, e.target.value)
              }
              name={doccasemblePackage.name}
              label={doccasemblePackage.label}
              type={doccasemblePackage.type}
              errors={errors}
              touched={touched}
              success={
                values[doccasemblePackage.name]?.length > 0 &&
                !errors[doccasemblePackage.name]
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              value={values[filename.name]}
              onChange={(e) => setFieldValue(filename.name, e.target.value)}
              name={filename.name}
              label={filename.label}
              type={filename.type}
              errors={errors}
              touched={touched}
              success={
                values[filename.name]?.length > 0 && !errors[filename.name]
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              value={values[doccasembleIndex.name]}
              onChange={(e) =>
                setFieldValue(doccasembleIndex.name, e.target.value)
              }
              name={doccasembleIndex.name}
              label={doccasembleIndex.label}
              type={doccasembleIndex.type}
              errors={errors}
              touched={touched}
              success={
                values[doccasembleIndex.name]?.length > 0 &&
                !errors[doccasembleIndex.name]
              }
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
