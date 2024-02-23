"use client";

import { Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";
import { update } from "/actions/tasks";
import Link from "next/link";
import { useState } from "react";

export default function Content({ task }) {
  const [description, setDescription] = useState(task.description);

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
          <MDTypography variant="body2" fontWeight="bold">
            Descripción
          </MDTypography>
          <FormField
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => update(task.id, { description: description })}
            sx={{ ml: 1, width: "100%" }}
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
