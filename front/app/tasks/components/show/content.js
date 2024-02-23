"use client";

import { Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { update } from "/actions/tasks";
import MDEditor from "/components/MDEditor";
import Link from "next/link";
import { useState } from "react";
import { parseEditorState } from "../../../../utils/parseEditorState";
import { convertToRaw } from "draft-js";

export default function Content({ task }) {
  const [description, setDescription] = useState(
    parseEditorState(task.description)
  );

  return (
    <Grid item xs={8} wrap="nowrap">
      <MDBox px={5} py={2}>
        <MDBox py={2}>
          <MDTypography variant="body1" fontWeight="bold" display="inline">
            Relacionado:
          </MDTypography>{" "}
          {task.taskable_type === "project" && (
            <Link
              href={`/projects/${task.taskable.id}`}
              sx={{ overflow: "wrap" }}
            >
              {task.taskable.name}
            </Link>
          )}
        </MDBox>

        <Divider />

        <MDBox py={2}>
          <MDBox display="flex">
            <MDTypography variant="body2" fontWeight="bold" mb={2}>
              Descripción
            </MDTypography>
          </MDBox>
          <MDEditor
            editorStyle={{ minHeight: "10vh", padding: "10px 16px" }}
            editorState={description}
            setEditorState={setDescription}
            onBlur={() => {
              const raw = convertToRaw(description.getCurrentContent());
              const strDescription = JSON.stringify(raw);
              update(task.id, { description: strDescription });
            }}
          />
        </MDBox>

        <Divider />

        <MDBox py={2}>
          <MDTypography variant="body2" fontWeight="bold">
            Lista de Verificación de Artículos
          </MDTypography>
          {task.checklistItems.map((item) => (
            <MDTypography key={item.id} variant="body2" display="inline">
              {item.description}
            </MDTypography>
          ))}
        </MDBox>

        <Divider />

        <MDBox py={2}>
          <MDTypography variant="body2" fontWeight="bold">
            Comentarios
          </MDTypography>
          {task.comments.map((comment) => (
            <MDTypography key={comment.id} variant="body2" display="inline">
              {comment.content}
            </MDTypography>
          ))}
        </MDBox>
      </MDBox>
    </Grid>
  );
}
