"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import form from "./schemas/form";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { editorStateToHtml } from "/utils/parseEditorState";
import { EditorState } from "draft-js";

export default function FormContent({ values, setFieldValue, errors }) {
  const { formField } = form;
  const { description } = formField;
  const [descriptionEditorState, setDescriptionEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const strDescription = editorStateToHtml(descriptionEditorState);

    setFieldValue(description.name, strDescription);
  }, [descriptionEditorState, setFieldValue, description]);

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <MDTypography variant="body2" color="text">
          {description.label}
        </MDTypography>
        <MDEditor
          editorStyle={{ minHeight: "20vh" }}
          editorState={descriptionEditorState}
          setEditorState={setDescriptionEditorState}
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
