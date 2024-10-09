"use client";

import {
  Autocomplete,
  Card,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import MDBox from "/components/MDBox";
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
import { useSession } from "next-auth/react";
import { useDataProvider } from "/providers/DataProvider";

import { DONE_STATUS_ID, DONE_STATUS } from "/utils/constants/taskStatuses";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import useTodo from "/hooks/useTodo";
import { attachTasks } from "/actions/projects";
import { update, destroy } from "/actions/tasks";
import Modal from "/components/Modal";

import SlackButton from "/components/SlackButton";
import SlackShare from "/components/ModalContent/SlackShare";
import useSlackShare from "/hooks/useSlackShare";

import ReceiptIcon from "@mui/icons-material/Receipt";
import GavelIcon from "@mui/icons-material/Gavel";
import EmailIcon from "@mui/icons-material/Email";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import {
  ACTION_EXPENSE,
  ACTION_REQUEST,
  ACTION_EMAIL,
} from "/utils/constants/actionTypes";

const renderIcon = (type) => {
  if (type === ACTION_EXPENSE) {
    return <ReceiptIcon fontSize="medium" />;
  } else if (type === ACTION_REQUEST) {
    return <GavelIcon fontSize="medium" />;
  } else if (type === ACTION_EMAIL) {
    return <EmailIcon fontSize="medium" />;
  } else {
    return <TextFieldsIcon fontSize="medium" />;
  }
};

export default function Content({ selectedFork }) {
  const {
    task,
    isTimerStarted,
    currentTimerId,
    markAsCompleted,
    stopTimer,
    startTimer,
    closeShowModal,
  } = useDataProvider();

  const [note, setNote] = useState("");
  const [isStoppingTimer, setIsStoppingTimer] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(selectedFork);
  const [isAttachingTasks, setIsAttachingTasks] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [createdSB, setCreatedSB] = useState(false);
  const {
    items,
    progress,
    getFilteredItems,
    createItem,
    toggleChecked,
    removeItem,
    editItem,
  } = useTodo(task.checklistItems);

  const { openSlackShareModal, setOpenSlackShareModal } = useSlackShare({
    model: task,
  });

  const { data: session } = useSession();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleStopTimer = async () => {
    await stopTimer(currentTimerId, note);
    setIsStoppingTimer(false);
    setNote("");
  };

  const handleSelectNextStep = async () => {
    setIsAttachingTasks(true);
    try {
      await attachTasks({
        projectId: task.taskable.id,
        processId: selectedProcess.id,
        staffId: session.staff.id,
      });
      setCreatedSB(true);
    } catch (error) {
      setErrorSB(true);
    }
    setIsAttachingTasks(false);
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

  const handleDeleteTask = async () => {
    setShowConfirmModal(true);
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
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        height="auto"
      >
        <MDBox p={2}>
          <MDTypography variant="h4" mb={5}>
            ¿Está seguro que desea eliminar la tarea?
          </MDTypography>
          <MDBox display="flex" justifyContent="end" gap={6}>
            <MDButton
              variant="gradient"
              color="light"
              onClick={() => {
                setShowConfirmModal(false);
              }}
            >
              Cancelar
            </MDButton>
            <MDButton
              variant="gradient"
              color="error"
              onClick={() => {
                setIsDeleteLoading(true);
                destroy(task.id);
                closeShowModal();
              }}
            >
              {isDeleteLoading ? (
                <CircularProgress size={24} color="white" />
              ) : (
                "Eliminar Tarea"
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </Modal>
      <MDBox px={5} py={2}>
        <MDBox py={2} container display="flex" flexDirection="column">
          <MDTypography variant="body2" fontWeight="bold" display="inline">
            Relacionado:
          </MDTypography>
          {task.taskable_type === PROJECT_TYPE ? (
            <Link
              href={`/projects/${task.taskable?.id}`}
              sx={{ overflow: "wrap" }}
            >
              <MDTypography
                variant="body2"
                fontWeight="bold"
                color="info"
                display="inline"
              >
                {task.taskable?.name}
              </MDTypography>
            </Link>
          ) : (
            <Link
              href={`/invoices/${task.taskable.id}`}
              sx={{ overflow: "wrap" }}
            >
              <MDTypography
                variant="body2"
                fontWeight="bold"
                color="info"
                display="inline"
              >
                Factura # {task.taskable.id}
              </MDTypography>
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

            <MDButton
              color="error"
              size="small"
              sx={{ maxHeight: "50px" }}
              onClick={handleDeleteTask}
            >
              Eliminar Tarea
            </MDButton>
            <SlackButton
              label="Compartir por Slack"
              size="small"
              onClick={() => {
                setOpenSlackShareModal(true);
              }}
            />
            <SlackShare
              open={openSlackShareModal}
              onClose={() => {
                setOpenSlackShareModal(false);
              }}
              modelId={task?.id}
              modelType="Task"
            />
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
              <Grid
                container
                xs={12}
                spacing={3}
                display="flex"
                flexWrap="wrap"
                width="100%"
                gap={1}
              >
                <Grid item xs={12} sm={4}>
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
                  {selectedProcess && selectedProcess.realStepQuantity == 0 && (
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
            <Divider />
          </>
        )}
        <MDBox py={2}>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="body2" fontWeight="bold">
              Lista de Quehaceres
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
        <MDBox py={2} display="flex" flexDirection="column">
          <MDTypography variant="body2" fontWeight="bold" mb={2}>
            Lista de acciones disponibles
          </MDTypography>
          <Grid container xs={12} spacing={5}>
            {task.procedure?.actions &&
              task.procedure.actions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <MDButton
                    key={action.id}
                    variant="gradient"
                    color="dark"
                    size="small"
                    onClick={() => {
                      console.log(action);
                    }}
                    sx={{
                      height: "40px",
                      width: "150px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {action.type.label}
                      {renderIcon(action.type.id)}
                    </span>
                  </MDButton>
                </Grid>
              ))}
          </Grid>
        </MDBox>
      </MDBox>
    </Grid>
  );
}
