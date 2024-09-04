"use client";

import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";

import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";
import MDSnackbar from "/components/MDSnackbar";

import Modal from "/components/Modal";
import { DataProvider } from "/providers/DataProvider";
import Show from "./show";
import Link from "next/link";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalContentForm from "/components/ModalContent/Task";
import { Backdrop, CircularProgress, Grid, Tooltip } from "@mui/material";

import { destroy } from "/actions/tasks";

import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { INVOICE_TYPE } from "/utils/constants/taskableTypes";
import { AccessAlarm, LockClockOutlined, NoteAdd } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";
import {
  useRouter,
  useSearchParams,
  usePathname,
  redirect,
} from "next/navigation";
import { getColor, getPriorityColor } from "/utils/project-state-colors";

import useTaskTable from "/hooks/useTaskTable";
import { startTransition, useEffect, useTransition } from "react";

export default function Table({
  rows,
  meta,
  priorities,
  repeats,
  taskableItems,
  tagsData,
  statuses,
  staffs,
  dependencyTasks,
  partners,
  currentTimer,
  currentTaskId,
  actionsData,
  tableFields,
  partnerId,
  invoice,
  notificationPriorities = [],
}) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    optimisticRows,
    task,
    openEditModal,
    openShowModal,
    handleCloseEditModal,
    handleCloseShowModal,
    stopTimer,
    startTimer,
    getSelectedFork,
    handleCompleteTask,
    setOpenShowModal,
    setOpenEditModal,
    setTaskId,
    isLoadingShow,
    isSaving,
    successOnSaveSB,
    setSuccessOnSaveSB,
    saveTask,
    errorOnSaveSB,
    setErrorOnSaveSB,
  } = useTaskTable({ rows, dispatch, currentTaskId, statuses });
  const { darkMode } = controller;
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCancelling, startTransition] = useTransition();

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const handleOpenShowModal = (id) => {
    setTaskId(id);
    setOpenShowModal(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("taskId", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeShowModal = async () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("taskId");
      router.replace(`${pathname}?${params.toString()}`);
      handleCloseShowModal();
    });
  };

  const handleSaveTask = async (taskId, data) => {
    await saveTask(taskId, data);
    closeShowModal();
  };

  useEffect(() => {
    const taskId = parseInt(searchParams.get("taskId"));

    if (Number.isNaN(taskId)) return;

    if (taskId !== currentTaskId && taskId !== task?.id && !isCancelling) {
      handleOpenShowModal(taskId);
    }
  }, [searchParams, setTaskId, setOpenShowModal, currentTaskId, task]);

  const renderSaveSnackbar = () => {
    return successOnSaveSB ? (
      <MDSnackbar
        color="success"
        icon="info"
        title="La tarea fue actualizada correctamente"
        content="Se ha actualizado la tarea correctamente"
        open={successOnSaveSB || errorOnSaveSB}
        onClose={() => setSuccessOnSaveSB(false)}
        close={() => setSuccessOnSaveSB(false)}
        bgWhite
      />
    ) : errorOnSaveSB ? (
      <MDSnackbar
        color="error"
        icon="info"
        title="La tarea no fue actualizada correctamente"
        content="No se ha podido actualizar la tarea, por favor intente nuevamente"
        open={errorOnSaveSB}
        onClose={() => setErrorOnSaveSB(false)}
        close={() => setErrorOnSaveSB(false)}
        bgWhite
      />
    ) : null;
  };

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Bloqueada por",
      accessor: "isBlocked",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          {row.original.dependencies.map((dependency) => (
            <Grid key={dependency.id}>
              <MDBadge
                variant="gradient"
                color={
                  dependency.status_id === DONE_STATUS_ID ? "success" : "dark"
                }
                size="lg"
                badgeContent={`#${dependency.id}`}
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpenShowModal(dependency.id)}
              />
            </Grid>
          ))}
        </MDBox>
      ),
    },
    {
      Header: "Nombre",
      accessor: "name",
      Cell: ({ row }) =>
        row.original.isBlocked ? (
          <MDBox width="100%" display="flex" justifyContent="start">
            <MDTypography variant="body2" color="dark" fontSize="small">
              {row.original.name}
            </MDTypography>
          </MDBox>
        ) : (
          <MDBox sx={{ cursor: "pointer" }}>
            <MDTypography
              variant="body2"
              color="info"
              fontSize="small"
              onClick={() => handleOpenShowModal(row.original.id)}
            >
              {row.original.name}
            </MDTypography>
          </MDBox>
        ),
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ row }) => (
        <MDBox display="flex" flexDirection="row" alignItems="center">
          <MDBadge
            variant="contained"
            color={getColor(row.original.status.id)}
            size="md"
            badgeContent={row.original.status.name}
          />
        </MDBox>
      ),
    },
    {
      Header: "Fecha de inicio",
      accessor: "start_date",
    },
    {
      Header: "Fecha de vencimiento",
      accessor: "due_date",
    },
    {
      Header: "Etiquetas",
      accessor: "labels",
      disableSortBy: true,
      Cell: ({ row }) =>
        row.original.tags &&
        row.original.tags.map((tag) => (
          <Grid key={tag.id}>
            <MDBadge
              variant="gradient"
              color="dark"
              size="md"
              badgeContent={tag.name}
              sx={{ my: 1 }}
            />
          </Grid>
        )),
    },
    {
      Header: "Prioridad",
      accessor: "priority",
      width: 200,
      Cell: ({ row }) => (
        <MDBox display="flex" flexDirection="row" alignItems="center">
          <MDBadge
            variant="contained"
            color={getPriorityColor(row.original.priority.name)}
            size="md"
            badgeContent={row.original.priority.name}
          />
        </MDBox>
      ),
    },
    {
      Header: "Autor",
      accessor: "author",
      Cell: ({ value }) => value && value.name,
    },
    {
      Header: "Acciones",
      disableSortBy: true,
      Cell: ({ row }) => (
        <MDBox display="flex">
          <Tooltip title="Agregar Archivo">
            <Link
              href={{
                pathname: "/files/create",
                query: { taskId: row.original.id },
              }}
            >
              <NoteAdd
                color="warning"
                fontSize="medium"
                sx={{ mr: 1, cursor: "pointer" }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Editar tarea">
            <EditNoteIcon
              color="info"
              fontSize="medium"
              onClick={() => {
                setTaskId(row.original.id);
                setOpenEditModal(true);
              }}
              sx={{ mr: 1, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={() => {
                handleDelete(row.original.id);
              }}
              sx={{
                mx: 1,
                cursor: "pointer",
                display: row.original.isBlocked ? "none" : "block",
              }}
            />
          </Tooltip>
          <Tooltip title="Ver Cambios">
            <Link href={`/tasks/${row.original.id}/changes`}>
              <VisibilityIcon
                color="action"
                fontSize="medium"
                sx={{ mx: 1, cursor: "pointer" }}
              />
            </Link>
          </Tooltip>
          {currentTimer?.task_id === row.original.id ? (
            <Tooltip title="Detener temporizador">
              <LockClockOutlined
                color="error"
                fontSize="medium"
                onClick={() => stopTimer(currentTimer?.id)}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  display: row.original.isBlocked ? "none" : "block",
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Iniciar temporizador">
              <AccessAlarm
                color="success"
                fontSize="medium"
                onClick={() => startTimer(row.original.id, session.staff.id)}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  display: row.original.isBlocked ? "none" : "block",
                }}
              />
            </Tooltip>
          )}
        </MDBox>
      ),
    },
  ];

  const table = { columns, rows: optimisticRows };

  return (
    <MDBox>
      {renderSaveSnackbar()}
      <MDBox width="100%" display="flex" gap={5} justifyContent="flex-end">
        <MDButton
          variant="gradient"
          color={darkMode ? "light" : "dark"}
          onClick={() => {
            setOpenEditModal(true);
          }}
        >
          Crear nueva tarea
        </MDButton>
      </MDBox>
      {openEditModal && (
        <Modal
          open={openEditModal}
          onClose={() => {
            handleCloseEditModal();
          }}
          width="40%"
        >
          <ModalContentForm
            priorities={priorities}
            repeats={repeats}
            taskableItems={taskableItems}
            dependencyTasks={dependencyTasks}
            tagsData={tagsData}
            partners={partners}
            task={
              invoice && !task
                ? {
                    taskable_id: invoice.id,
                    taskable_type: INVOICE_TYPE,
                    partner_id:
                      invoice.project?.billablePartnerId ?? invoice.partner.id,
                  }
                : task
            }
            actionsData={actionsData}
            tableFields={tableFields}
            partnerId={partnerId}
            mode={invoice || !task ? MODAL_TYPES.CREATE : MODAL_TYPES.EDIT}
          />
        </Modal>
      )}
      {openShowModal && (
        <Modal
          open={openShowModal}
          onClose={() => {
            closeShowModal();
          }}
          px={0}
          py={0}
          width="70%"
          sx={{ overflow: "scroll" }}
        >
          {isLoadingShow || !task ? (
            <Backdrop open={true} sx={{ background: "white" }}>
              <CircularProgress size={80} color="black" />
            </Backdrop>
          ) : (
            <DataProvider
              value={{
                task,
                currentTimerId: currentTimer?.id,
                isTimerStarted: currentTimer?.task_id === task.id,
                statuses,
                priorities,
                tagsData,
                staffs,
                markAsCompleted: handleCompleteTask,
                stopTimer,
                startTimer,
                getSelectedFork,
                notificationPriorities,
                closeShowModal,
                handleSaveTask,
                isSaving,
                isCancelling,
              }}
            >
              <Show />
            </DataProvider>
          )}
        </Modal>
      )}
      <DataTable
        table={table}
        meta={meta}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
      />
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          errorMsg,
          setErrorMsg,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
