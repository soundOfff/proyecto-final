"use client";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDEditor from "/components/MDEditor";

import { attach } from "/actions/project-notes";

import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function Projects() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [content, setContent] = useState(null);
  const { id: projectId } = useParams();

  useEffect(() => {
    setContent(editorState.getCurrentContent().getPlainText());
  }, [editorState, setContent]);

  return (
    <MDBox component="form" action={attach} pb={3} px={3}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} lg={10}>
          <Card>
            <MDBox pt={3} px={3} mb={4}>
              <MDTypography sx={{ mb: 5, textAlign: "center" }}>
                Notas Privadas
              </MDTypography>
              <MDEditor
                editorStyle={{ minHeight: "40vh" }}
                editorState={editorState}
                setEditorState={setEditorState}
              />
              <input name="content" type="hidden" value={content} />
              <input name="project_id" type="hidden" value={projectId} />
              <MDBox display="flex" justifyContent="end" my={5}>
                <MDButton type="submit" variant="gradient" color="dark">
                  Guardar
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Projects;
