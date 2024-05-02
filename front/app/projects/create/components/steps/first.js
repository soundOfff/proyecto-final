"use client";

import { Grid } from "@mui/material";
import FormField from "/pagesComponents/pages/users/new-user/components/FormField";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";

import { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { ErrorMessage } from "formik";

export default function First({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { name, cost, estimatedHours, expedient, description } = formField;
  const {
    name: nameV,
    cost: costV,
    estimatedHours: estimatedHoursV,
    expedient: expedientV,
  } = values;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setFieldValue(
      "description",
      editorState.getCurrentContent().getPlainText()
    );
  }, [editorState, setFieldValue]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <FormField
          name={name.name}
          label={name.label}
          type={name.type}
          placeholder={name.placeholder}
          value={nameV}
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
          value={costV}
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
          value={estimatedHoursV}
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
          value={expedientV}
          error={errors.expedient && touched.expedient}
          success={expedient.length > 0 && !errors.expedient}
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
