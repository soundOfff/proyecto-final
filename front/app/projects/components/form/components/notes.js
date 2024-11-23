"use client";

import { Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";
import MDEditor from "/components/MDEditor";
import MDBox from "/components/MDBox";
import { ErrorMessage } from "formik";

export default function Notes({ description, editorState, setEditorState }) {
  return (
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
  );
}
