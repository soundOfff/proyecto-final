"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDEditor from "/components/MDEditor";
import MDButton from "/components/MDButton";
import { EditorState } from "draft-js";
import { useState } from "react";
import MDTypography from "/components/MDTypography";
import { editorStateToHtml } from "/utils/parseEditorState";
import { useSession } from "next-auth/react";

export default function NoteForm({ setFieldValue, values, notes }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { data: session } = useSession();

  const handleAddNote = () => {
    const strDescription = editorStateToHtml(editorState);

    if (strDescription) {
      setFieldValue(notes.name, [
        ...values[notes.name],
        { content: strDescription, staff_id: session?.staff?.id },
      ]);

      setEditorState(EditorState.createEmpty());
    }
  };

  return (
    <Grid container spacing={2} my={2}>
      <Grid item xs={10}>
        <MDTypography variant="h6">Notas Privadas</MDTypography>
        <MDEditor
          editorState={editorState}
          setEditorState={setEditorState}
          editorStyle={{ height: "200px" }}
        />
      </Grid>
      <Grid item xs={2} display="flex" alignItems="center">
        <MDBox>
          <MDButton variant="gradient" color="success" onClick={handleAddNote}>
            Agregar Nota
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}
