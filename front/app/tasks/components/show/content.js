"use client";

import { Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import { update } from "/actions/tasks";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseEditorState } from "../../../../utils/parseEditorState";
import { convertToRaw } from "draft-js";
import ItemList from "./itemList";

export default function Content({ task }) {
  const [description, setDescription] = useState(
    parseEditorState(task.description)
  );
  const [items, setItems] = useState(task.checklist_items ?? []);

  const addNewTask = () => {
    const newTask = {
      id: items.length + 1,
      content: "",
    };
    setItems([...items, newTask]);
  };

  const removeTask = (id) => {
    const newitems = items.filter((task) => task.id !== id);
    setItems(newitems);
  };

  const editTask = (id, content) => {
    const newitems = items.map((task) => {
      if (task.id === id) {
        task.content = content;
      }
      return task;
    });
    setItems(newitems);
  };

  useEffect(() => {
    update(task.id, { checklist_items: items });
  }, [items]);

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
          <MDBox display="flex">
            <MDTypography variant="body2" fontWeight="bold">
              Lista de Verificación de Artículos
            </MDTypography>
          </MDBox>
          <ItemList
            items={items}
            addNewTask={addNewTask}
            editTask={editTask}
            removeTask={removeTask}
          />
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
