"use client";

import { Card, CircularProgress, Divider, Grid, Icon } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import ItemList from "./item-list";
import FormField from "/pagesComponents/ecommerce/products/new-product/components/FormField";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useDataProvider } from "/providers/DataProvider";

import { DONE_STATUS_ID, DONE_STATUS } from "/utils/constants/taskStatuses";
import { PROJECT_TYPE } from "/utils/constants/taskableTypes";
import { update, destroy } from "/actions/tasks";
import Modal from "/components/Modal";

import SlackShare from "/components/SlackShare";

import ActionList from "./action-list";
import NextStepForm from "./next-step-form";

export default function Content({ selectedFork, refetch }) {
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
  const [description, setDescription] = useState(task.description);
  const [isStoppingTimer, setIsStoppingTimer] = useState(false);

  const { data: session } = useSession();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleStopTimer = async () => {
    await stopTimer(currentTimerId, note);
    setIsStoppingTimer(false);
    setNote("");
  };

  const handleDeleteTask = async () => {
    setShowConfirmModal(true);
  };

  const shouldShowNextStepForm =
    task &&
    task.isFinalTask &&
    task.status?.name === DONE_STATUS &&
    task.procedure?.process?.forks?.length !== 0;

  return (
    <Grid item xs={8} wrap="nowrap">
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
      <MDBox px={{ xs: 1, sm: 4 }} py={2}>
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
              href={`/invoices/${task?.taskable?.id}`}
              sx={{ overflow: "wrap" }}
            >
              <MDTypography
                variant="body2"
                fontWeight="bold"
                color="info"
                display="inline"
              >
                Factura # {task?.taskable?.id}
              </MDTypography>
            </Link>
          )}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6} md={3}>
              {task.status_id !== DONE_STATUS_ID ? (
                <MDButton
                  sx={{
                    maxWidth: "100%",
                  }}
                  color="info"
                  onClick={() => markAsCompleted(task.id)}
                >
                  <Icon sx={{ fontWeight: "bold", mr: 1 }}>done</Icon>
                  Completar
                </MDButton>
              ) : (
                <MDButton color="dark" sx={{ maxWidth: "100%" }}>
                  Tarea Completada
                </MDButton>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {isTimerStarted ? (
                <MDButton
                  color="primary"
                  sx={{
                    maxWidth: "100%",
                  }}
                  onClick={() => setIsStoppingTimer(true)}
                >
                  <Icon sx={{ fontWeight: "bold", mr: 1 }}>alarm</Icon>
                  Detener
                </MDButton>
              ) : (
                <MDButton
                  color="success"
                  sx={{
                    maxWidth: "100%",
                  }}
                  onClick={() => startTimer(task.id, session.staff.id)}
                >
                  <Icon sx={{ fontWeight: "bold", mr: 1 }}>alarm</Icon>
                  Iniciar
                </MDButton>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MDButton
                color="error"
                variant="gradient"
                sx={{
                  maxWidth: "100%",
                }}
                onClick={handleDeleteTask}
              >
                <Icon sx={{ fontWeight: "bold", mr: 1 }}>delete</Icon> Eliminar
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SlackShare modelId={task.id} modelType="Task" />
            </Grid>
            {isStoppingTimer && (
              <Grid item xs={12}>
                <Card
                  variant="outlined"
                  sx={{
                    width: "100%",
                    padding: { xs: "10px", sm: "15px", md: "20px" },
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <MDTypography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
                  >
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
                      sx={{
                        fontSize: "small !important",
                        padding: { xs: "6px 12px", sm: "8px 16px" },
                      }}
                    >
                      Guardar
                    </MDButton>
                  </MDBox>
                </Card>
              </Grid>
            )}
          </Grid>
        </MDBox>
        <Divider />
        {shouldShowNextStepForm && (
          <NextStepForm selectedFork={selectedFork} task={task} />
        )}
        <MDBox py={2} display="flex" flexDirection="column">
          <MDTypography variant="body2" fontWeight="bold" pb={2}>
            Descripbión
          </MDTypography>
          <FormField
            name="description"
            label=""
            placeholder="Ej. Se debe realizar la limpieza de la oficina"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => update(task.id, { description })}
            multiline
            rows={4}
          />
        </MDBox>
        <Divider />
        <ItemList
          taskId={task?.id}
          checklistItems={task?.checklistItems}
          refetch={refetch}
        />
        <Divider />
        <ActionList />
      </MDBox>
    </Grid>
  );
}
