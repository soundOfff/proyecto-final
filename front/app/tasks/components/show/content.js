"use client";

import { Divider, Grid, Tooltip } from "@mui/material";
import MDBox from "/components/MDBox";
import { update } from "/actions/tasks";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDProgress from "/components/MDProgress";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseEditorState } from "../../../../utils/parseEditorState";
import { convertToRaw } from "draft-js";
import ItemList from "./itemList";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";
import { Check } from "@mui/icons-material";

export default function Content({
  task,
  markAsCompleted,
  stopTimer,
  startTimer,
  isTimerStarted,
  currentTimerId,
}) {
  const [description, setDescription] = useState(
    parseEditorState(task.description)
  );
  const [items, setItems] = useState(task.checklistItems || []);
  const [comments, setComments] = useState(task.comments || []);
  const [commentContent, setCommentContent] = useState("");
  const [progress, setProgress] = useState(0);

  const addNewTask = () => {
    const newTask = {
      id: items.length + 1,
      description: "",
      finished: false,
    };
    setItems([...items, newTask]);
  };

  const removeTask = (id) => {
    const newItems = items.filter((task) => task.id !== id);
    setItems(newItems);
    update(task.id, { checklist_items: newItems });
  };

  const editTask = (id, description, finished = false) => {
    const newItems = items.map((task) => {
      if (task.id === id) {
        task.description = description;
        task.finished = finished;
      }
      return task;
    });
    setItems(newItems);
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
    getCurrentProgress();
  }, [items]);

  const getCurrentProgress = () => {
    const total = items.length;
    const finished = items.filter((item) => item.finished).length;
    setProgress((finished / total) * 100);
  };

  const handleBlur = async () => {
    const filteredItems = items.map((item) => {
      return {
        description: item.description,
        finished: item.finished,
      };
    });
    await update(task.id, { checklist_items: filteredItems });
  };

  return (
    <Grid item xs={8} wrap="nowrap">
      <MDBox px={5} py={2}>
        <MDBox py={2} container display="flex" flexDirection="column">
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
          <MDBox container sx={{ gap: "10px", display: "flex" }}>
            <MDButton
              color="info"
              size="small"
              onClick={() => markAsCompleted(task.id)}
            >
              Completar tarea <Check color="white" fontSize="32px" />
            </MDButton>

            {
              // TODO: Change the staff_id
              isTimerStarted ? (
                <MDButton
                  color="primary"
                  size="small"
                  onClick={() => stopTimer(currentTimerId)}
                >
                  <MDTypography variant="button" color="white">
                    Detener temporizador
                  </MDTypography>
                </MDButton>
              ) : (
                <MDButton
                  color="success"
                  size="small"
                  onClick={() => startTimer(task.id, 5)}
                >
                  <MDTypography variant="button" color="white">
                    Iniciar temporizador
                  </MDTypography>
                </MDButton>
              )
            }
          </MDBox>
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
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="body2" fontWeight="bold">
              Lista de Verificación de Artículos
            </MDTypography>
            <MDBox sx={{ width: "80%", my: 1 }}>
              {progress > 0 && (
                <MDBox
                  sx={{ display: "flex", alignItems: "center", flexGrow: "1" }}
                >
                  <MDBox width="100%" mt={0.25}>
                    <MDProgress
                      variant="gradient"
                      color="success"
                      value={progress}
                    />
                  </MDBox>
                  <MDBox sx={{ minWidth: 40, mx: 2 }}>
                    <MDTypography
                      variant="body2"
                      color="text.secondary"
                    >{`${Math.round(progress)}%`}</MDTypography>
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </MDBox>
          <ItemList
            items={items}
            addNewTask={addNewTask}
            editTask={editTask}
            removeTask={removeTask}
            handleBlur={handleBlur}
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
