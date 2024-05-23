"use client";

import { Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";

import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { ErrorMessage } from "formik";
import { parseEditorState } from "/utils/parseEditorState";

export default function First({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { cost, estimatedHours, expedient, description } = formField;
  const [editorState, setEditorState] = useState(() =>
    parseEditorState(values[description.name])
  );

  useEffect(() => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const strDescription = JSON.stringify(raw);
    setFieldValue(description.name, strDescription);
  }, [setFieldValue, description, values, editorState]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[cost.name]}
          name={cost.name}
          label={cost.label}
          type={cost.type}
          placeholder={cost.placeholder}
          error={errors[cost.name] && touched[cost.name]}
          success={values[cost.name].length > 0 && !errors[cost.name]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          value={values[estimatedHours.name]}
          name={estimatedHours.name}
          label={estimatedHours.label}
          type={estimatedHours.type}
          placeholder={estimatedHours.label}
          error={errors[estimatedHours.name] && touched[estimatedHours.name]}
          success={
            values[estimatedHours.name].length > 0 &&
            !errors[estimatedHours.name]
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormField
          value={values[expedient.name]}
          name={expedient.name}
          label={expedient.label}
          type={expedient.type}
          placeholder={expedient.placeholder}
          error={errors[expedient.name] && touched[expedient.name]}
          success={values[expedient.name].length > 0 && !errors[expedient.name]}
        />
      </Grid>
      <Grid item xs={12}>
        <MDTypography variant="body2" color="text">
          {description.label}
        </MDTypography>
        <MDEditor
          editorStyle={{ minHeight: "20vh", fontSize: "18px" }}
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            <ErrorMessage name={description.name} />
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
