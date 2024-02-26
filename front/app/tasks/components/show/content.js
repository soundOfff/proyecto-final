"use client";

import { Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import { update } from "/actions/tasks";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseEditorState } from "../../../../utils/parseEditorState";
import { convertToRaw } from "draft-js";
import ItemList from "./itemList";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";

export default function Content({ task }) {
  const [description, setDescription] = useState(
    parseEditorState(task.description)
  );
  const [items, setItems] = useState(task.checklist_items || []);
  const [comments, setComments] = useState(task.comments || []);
  const [commentContent, setCommentContent] = useState("");

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

  const handleCommentUpdate = async () => {
    setComments([...comments, { taskId: task.id, content: commentContent }]);
    await update(task.id, {
      comments: [
        ...task.comments,
        { taskId: task.id, content: commentContent },
      ],
    });
  };

  useEffect(() => {
    update(task.id, { checklist_items: items });
  }, [items, task.id]);

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
          {comments.map((comment) => (
            <MDTypography key={comment.id} variant="body2" my={2}>
              {comment.content}
            </MDTypography>
          ))}
          <FormField
            value={commentContent}
            type="text"
            placeholder="Comentario..."
            onChange={(e) => setCommentContent(e.target.value)}
            sx={{ mb: 2, width: "100%" }}
          />
          <MDBox display="flex" justifyContent="end">
            <MDButton
              variant="gradient"
              color="dark"
              onClick={handleCommentUpdate}
            >
              Agregar
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Grid>
  );
}
