"use client";

import MDDropzone from "/components/MDDropzone";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "./schemas/form";

import { ErrorMessage } from "formik";
import { useEffect, useMemo } from "react";
import { Grid } from "@mui/material";

export default function FormContent({
  values,
  setFieldValue,
  errors,
  fileableType = null,
  handleAddFile,
}) {
  const { formField } = form;
  const { file: fileField, path, name } = formField;

  useEffect(() => {
    if (fileableType) {
      setFieldValue(path.name, `${fileableType}/`);
    }
  }, [values, fileableType, setFieldValue, path.name]);

  const options = useMemo(
    () => ({
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles: 1,
      url: "nourl",
      autoProcessQueue: false,
    }),
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MDDropzone setFieldValue={setFieldValue} options={options} />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={fileField.name} />
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={10} mt={2}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder="Nombre del archivo"
          value={values[name.name]}
          error={errors[name.name] && touched[name.name]}
          success={values[name.name]?.length > 0 && !errors[name.name]}
        />
      </Grid>
      <Grid xs={12} sm={2}>
        <MDBox display="flex" justifyContent="end" mt={3}>
          <MDButton
            type="button"
            variant="gradient"
            onClick={() => handleAddFile(values)}
            color="info"
          >
            Adjuntar
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}
