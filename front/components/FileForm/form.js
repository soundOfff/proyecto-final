"use client";

import MDDropzone from "./MDDropzone";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import form from "./schemas/form";

import { ErrorMessage } from "formik";
import { useMemo } from "react";
import { Grid } from "@mui/material";

export default function FormContent({ handleAddFile, handleRemoveFile }) {
  const { formField } = form;
  const { file: fileField, name } = formField;

  const options = useMemo(
    () => ({
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles: 5,
      url: "nourl",
      autoProcessQueue: false,
    }),
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MDDropzone
          addFields={handleAddFile}
          removeFile={handleRemoveFile}
          options={options}
          multiple={true}
        />
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
    </Grid>
  );
}
