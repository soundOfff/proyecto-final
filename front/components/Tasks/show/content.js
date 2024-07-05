"use client";

import { Autocomplete, Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDEditor from "/components/MDEditor";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDProgress from "/components/MDProgress";
import MDInput from "/components/MDInput";
import MDSnackbar from "/components/MDSnackbar";
import ItemList from "./itemList";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";

import Link from "next/link";
import { useState } from "react";
import { parseEditorState } from "/utils/parseEditorState";
import { convertToRaw } from "draft-js";
import { useSession } from "next-auth/react";
import { useDataProvider } from "/providers/DataProvider";

import { DONE_STATUS_ID, DONE_STATUS } from "/utils/constants/taskStatuses";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import useTodo from "/hooks/useTodo";
import { attachTasks } from "/actions/projects";
import { update } from "/actions/tasks";

export default function Content({ selectedFork }) {
  const {
    task,
    isTimerStarted,
    currentTimerId,
    markAsCompleted,
    stopTimer,
    startTimer,
  } = useDataProvider();

  const [description, setDescription] = useState(
    parseEditorState(task.description)
  );
  const [comments, setComments] = useState(
    task.comments.map((comment) => {
      return {
        task_id: comment.task_id,
        content: comment.content,
        staff_id: comment.staff_id,
      };
    }) || []
  );
  const [note, setNote] = useState("");
  const [isStoppingTimer, setIsStoppingTimer] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(selectedFork);
  const [isAttachingTasks, setIsAttachingTasks] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [createdSB, setCreatedSB] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const {
    items,
    progress,
    getFilteredItems,
    createItem,
    toggleChecked,
    removeItem,
    editItem,
  } = useTodo(task.checklistItems);
  const { data: session } = useSession();

  const handleStopTimer = async () => {
    await stopTimer(currentTimerId, note);
    setIsStoppingTimer(false);
    setNote("");
  };

  const handleSelectNextStep = async () => {
    setIsAttachingTasks(true);
    try {
      await attachTasks(task.taskable.id, selectedProcess.id);
      setCreatedSB(true);
    } catch (error) {
      setErrorSB(true);
    }
    setIsAttachingTasks(false);
  };

  const handleCommentUpdate = async () => {
    setComments([
      ...comments,
      { task_id: task.id, content: commentContent, staff_id: session.staff.id },
    ]);
    setCommentContent("");
    await update(task.id, {
      comments: [
        ...task.comments,
        {
          content: commentContent,
          staff_id: session.staff.id,
          task_id: task.id,
        },
      ],
    });
  };

  const handleSaveItems = async () => {
    await update(task.id, { checklist_items: getFilteredItems() });
  };

  const handleDeleteItem = async (id) => {
    const newItems = items.filter((item) => item.id !== id); // Server update
    removeItem(id); // UI update
    await update(task.id, { checklist_items: newItems });
  };

  const showNextStepForm = () => {
    if (!task) return false;

    return (
      task.isFinalTask &&
      task.status.name === DONE_STATUS &&
      task.procedure?.process?.forks?.length !== 0
    );
  };

  return (
    <Grid item xs={8} wrap="nowrap">
      <MDSnackbar
        color={errorSB ? "error" : "success"}
        icon={errorSB ? "warning" : "check_circle"}
        title={
          errorSB
            ? "Error al seleccionar paso"
            : "Paso seleccionado correctamente"
        }
        content={
          errorSB
            ? "Ocurrió un error al seleccionar el paso, intente de nuevo"
            : "El paso se seleccionó correctamente"
        }
        open={errorSB || createdSB}
        onClose={() => {
          setErrorSB(false);
          setCreatedSB(false);
        }}
        close={() => {
          setErrorSB(false);
          setCreatedSB(false);
        }}
        bgWhite
      />
      <MDBox px={5} py={2}>
        <MDBox py={2} container display="flex" flexDirection="column">
          <MDTypography variant="body1" fontWeight="bold" display="inline">
            Relacionado:
          </MDTypography>{" "}
          {task.taskable_type === PROJECT_TYPE ? (
            <Link
              href={`/projects/${task.taskable.id}`}
              sx={{ overflow: "wrap" }}
            >
              {task.taskable.name}
            </Link>
          ) : (
            <Link
              href={`/invoices/${task.taskable.id}`}
              sx={{ overflow: "wrap" }}
            >
              Factura # {task.taskable.id}
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
            {task.status_id !== DONE_STATUS_ID ? (
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

        {showNextStepForm() && (
          <>
            <MDTypography variant="body2" fontWeight="bold">
              Elegir siguiente paso
            </MDTypography>
            <MDBox
              py={2}
              display="flex"
              gap={2}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <MDBox display="flex" flexDirection="row" gap={1} width="100%">
                <Grid container xs={12} spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <Autocomplete
                      value={task?.procedure?.process}
                      disabled
                      options={[]}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          variant="standard"
                          label={"Paso anterior"}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Autocomplete
                      value={selectedProcess}
                      onChange={(e, value) => {
                        setSelectedProcess(value);
                      }}
                      options={task?.procedure?.process?.forks || []}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          variant="standard"
                          label={"Siguiente paso"}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                    {selectedProcess &&
                      selectedProcess.realStepQuantity == 0 && (
                        <MDTypography variant="caption" color="error">
                          Este paso no tiene procedimientos asociados
                        </MDTypography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <MDButton
                      variant="gradient"
                      color="dark"
                      disabled={
                        !selectedProcess ||
                        isAttachingTasks ||
                        selectedProcess.realStepQuantity == 0
                      }
                      onClick={handleSelectNextStep}
                    >
                      Seleccionar paso
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
            <Divider />
          </>
        )}

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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: "1",
                  }}
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
            taskId={task.id}
            createItem={createItem}
            editItem={editItem}
            toggleChecked={toggleChecked}
            saveItems={handleSaveItems}
            removeItem={handleDeleteItem}
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
