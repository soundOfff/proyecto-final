"use client";

import { Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";

import { useEffect, useState } from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { ErrorMessage } from "formik";

export default function First({ formData, project }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { name, cost, estimatedHours, expedient, description } = formField;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setFieldValue(
      description.name,
      editorState.getCurrentContent().getPlainText()
    );
  }, [editorState, setFieldValue, description]);

  useEffect(() => {
    if (project.description) {
      setFieldValue(description.name, project.description || "");
      const content = ContentState.createFromText(project.description);
      const newEditorState = EditorState.createWithContent(content);
      setEditorState(newEditorState);
    }
  }, [project.description, setFieldValue, description]);

  useEffect(() => {
    setFieldValue(name.name, project.name || "");
    setFieldValue(cost.name, project.cost || "");
    setFieldValue(estimatedHours.name, project.estimatedHours || "");
    setFieldValue(expedient.name, project.expedient || "");
  }, [
    project,
    name,
    cost,
    estimatedHours,
    expedient,
    description,
    setFieldValue,
  ]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          error={errors.name && touched.name}
          success={name.length > 0 && !errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={cost.name}
          label={cost.label}
          type={cost.type}
          placeholder={cost.placeholder}
          error={errors.cost && touched.cost}
          success={cost.length > 0 && !errors.cost}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={estimatedHours.name}
          label={estimatedHours.label}
          type={estimatedHours.type}
          placeholder={estimatedHours.label}
          error={errors.estimatedHours && touched.estimatedHours}
          success={estimatedHours.length > 0 && !errors.estimatedHours}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormField
          name={expedient.name}
          label={expedient.label}
          type={expedient.type}
          placeholder={expedient.placeholder}
          error={errors.expedient && touched.expedient}
          success={expedient.length > 0 && !errors.expedient}
        />
      </Grid>
      <Grid item xs={12}>
        <MDTypography variant="body2" color="text">
          {description.label}
        </MDTypography>
        <MDEditor
          editorStyle={{ minHeight: "20vh" }}
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
