"use client";

import { Card, CircularProgress, Divider, Grid } from "@mui/material";

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

            <SlackShare modelId={task.id} modelType="Task" />

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
        {shouldShowNextStepForm && (
          <NextStepForm selectedFork={selectedFork} task={task} />
        )}
        <MDBox py={2} display="flex" flexDirection="column">
          <MDTypography variant="body2" fontWeight="bold" pb={2}>
            Descripción
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
