"use client";

import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import { update } from "/actions/tasks";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDProgress from "/components/MDProgress";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseEditorState } from "/utils/parseEditorState";
import { convertToRaw } from "draft-js";
import ItemList from "./itemList";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";
import { useSession } from "next-auth/react";
import { DONE_ID } from "/utils/constants/taskStatuses";

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
  const [note, setNote] = useState("");
  const [isStoppingTimer, setIsStoppingTimer] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();

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

  const handleStopTimer = async () => {
    await stopTimer(currentTimerId, note);
    setIsStoppingTimer(false);
    setNote("");
  };

  const handleCommentUpdate = async () => {
    setComments([...comments, { taskId: task.id, content: commentContent }]);
    await update(task.id, {
      comments: [
        ...task.comments,
        {
          content: commentContent,
          staff_id: session.staff.id,
        },
      ],
    });
  };

  useEffect(() => {
    const total = items.length;
    const finished = items.filter((item) => item.finished).length;
    setProgress((finished / total) * 100);
  }, [items]);

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
          <MDBox
            sx={{
              gap: "10px",
              display: "flex",
              paddingTop: "10px",
              alignItems: "start",
            }}
          >
            {task.status_id !== DONE_ID ? (
              <MDButton
                color="info"
                size="small"
                sx={{ maxHeight: "50px" }}
                onClick={() => markAsCompleted(task.id)}
              >
                Completar tarea
              </MDButton>
            ) : (
              <MDButton color="dark" size="small" sx={{ maxHeight: "50px" }}>
                Tarea Completada
              </MDButton>
            )}

            {isTimerStarted ? (
              <MDButton
                color="primary"
                size="small"
                sx={{ maxHeight: "50px" }}
                onClick={() => setIsStoppingTimer(true)}
              >
                Detener temporizador
              </MDButton>
            ) : (
              <MDButton
                color="success"
                sx={{ maxHeight: "50px" }}
                size="small"
                onClick={() => startTimer(task.id, session.staff.id)}
              >
                Iniciar temporizador
              </MDButton>
            )}
            <MDBox display="flex" flexDirection="row" width="60%">
              {isStoppingTimer && (
                <>
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      padding: "20px",
                      margin: "0",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <MDTypography variant="body2" fontWeight="bold">
                      Nota de la tarea
                    </MDTypography>
                    <FormField
                      value={note}
                      type="text"
                      placeholder="Nota..."
                      onChange={(e) => setNote(e.target.value)}
                      sx={{ mb: 2, width: "100%" }}
                    />
                    <MDBox display="flex" justifyContent="end">
                      <MDButton
                        variant="gradient"
                        color="dark"
                        onClick={handleStopTimer}
                      >
                        Guardar
                      </MDButton>
                    </MDBox>
                  </Card>
                </>
              )}
            </MDBox>
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