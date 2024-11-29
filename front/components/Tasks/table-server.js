"use client";

import { useMaterialUIController } from "/context";
import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";

import Modal from "/components/Modal";
import Show from "./show";
import Link from "next/link";

import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalContentForm from "/components/ModalContent/Task";
import { Backdrop, CircularProgress, Tooltip } from "@mui/material";

import { destroy } from "/actions/tasks";

import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { INVOICE_TYPE } from "/utils/constants/taskableTypes";
import { AccessAlarm, LockClockOutlined, NoteAdd } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import { getColor, getPriorityColor } from "/utils/project-state-colors";
import useTaskShow from "/hooks/useTaskShow";
import useTaskForm from "/hooks/useTaskForm";

export default function Table({
  tasks,
  meta,
  currentTimer,
  partnerId,
  invoice,
}) {
  const [controller, dispatch] = useMaterialUIController();

  const {
    task: taskShow,
    isLoading: isLoadingShow,
    isModalOpen: isShowModalOpen,
    handleOpenModal: handleOpenShowModal,
    handleCloseModal: handleCloseShowModal,
    isSaving,
    handleCompleteTask,
    stopTimer,
    startTimer,
    handleSaveTask,
  } = useTaskShow({ tasks, dispatch });

  const {
    task: taskForm,
    isModalOpen: isEditModalOpen,
    handleOpenModal: handleOpenEditModal,
    handleCloseModal: handleCloseEditModal,
  } = useTaskForm();

  const { darkMode } = controller;
  const { data: session } = useSession();

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const columns = [
    {
      Header: "#",
      accessor: "id",
      width: 50,
    },
    {
      Header: "Nombre del caso",
      accessor: "isBlocked",
      disableSortBy: true,
      Cell: ({ row }) => {
        const task = row.original;
        return (
          <MDBox display="flex" alignItems="center">
            {task.taskable_type === "project" ? (
              <Link
                href={`/projects/${task.taskable?.id}`}
                sx={{ overflow: "wrap" }}
              >
                <MDTypography
                  variant="body2"
                  fontSize="small"
                  color="info"
                  display="inline"
                >
                  {task.taskable?.name}
                </MDTypography>
              </Link>
            ) : (
              <MDTypography variant="body2" color="textSecondary">
                -
              </MDTypography>
            )}
          </MDBox>
        );
      },
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
              onClick={() => handleOpenEditModal(row.original.id)}
              sx={{ mr: 1, cursor: "pointer" }}
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

  const table = { columns, rows: tasks };

  return (
    <MDBox>
      {isEditModalOpen && (
        <Modal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          width="40%"
          height="85%"
        >
          <ModalContentForm
            task={
              taskForm
                ? taskForm
                : {
                    taskable_id: invoice.id,
                    taskable_type: INVOICE_TYPE,
                    partner_id:
                      invoice.project?.billablePartnerId ?? invoice.partner.id,
                  }
            }
            partnerId={partnerId ?? null}
            mode={!taskForm ? MODAL_TYPES.CREATE : MODAL_TYPES.EDIT}
          />
        </Modal>
      )}
      {isShowModalOpen && (
        <Modal
          open={isShowModalOpen}
          onClose={handleCloseShowModal}
          px={0}
          py={0}
          width="70%"
          sx={{ overflow: "scroll" }}
        >
          {isLoadingShow || !taskShow ? (
            <Backdrop open={true} sx={{ background: "white" }}>
              <CircularProgress size={80} color="black" />
            </Backdrop>
          ) : (
            <Show
              {...{
                task: taskShow,
                isSaving,
                currentTimerId: currentTimer?.id,
                isTimerStarted: currentTimer?.task_id === taskShow.id,
                markAsCompleted: handleCompleteTask,
                stopTimer,
                startTimer,
                handleSaveTask,
                closeShowModal: handleCloseShowModal,
              }}
            />
          )}
        </Modal>
      )}
      <DataTable
        table={table}
        meta={meta}
        showTotalEntries={true}
        isSorted={true}
        actions={
          <MDButton
            variant="gradient"
            color={darkMode ? "light" : "dark"}
            onClick={() => handleOpenEditModal()}
          >
            Crear nueva tarea
          </MDButton>
        }
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
