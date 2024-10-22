"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";

import DeleteIcon from "@mui/icons-material/Delete";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";

import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDSnackbar from "/components/MDSnackbar";
import Loader from "./loader";

import { destroy, getAll, destroyMany } from "/actions/tasks";
import { useMaterialUIController } from "/context";

import Modal from "/components/Modal";
import ModalContentForm from "/components/ModalContent/Task";
import Show from "./show";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";
import { editSteps } from "/actions/tasks";
import update from "immutability-helper";
import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { getPriorityColor, getStatusColor } from "/utils/project-state-colors";
import { Backdrop, CircularProgress } from "@mui/material";

import useTaskShow from "/hooks/useTaskShow";
import useTaskForm from "/hooks/useTaskForm";
import useTaskAttach from "/hooks/useTaskAttach";

export default function Table({ project }) {
  const [controller, dispatch] = useMaterialUIController();
  const { currentTimer, darkMode } = controller;
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const {
    task: taskShow,
    isLoading: isLoadingShow,
    isModalOpen: isShowModalOpen,
    handleOpenModal: handleOpenShowModal,
    handleCloseModal: handleCloseShowModal,
    isSaving,
    successOnSaveSB,
    errorOnSaveSB,
    handleCompleteTask,
    getSelectedFork,
    stopTimer,
    startTimer,
    handleSaveTask,
    setSuccessOnSaveSB,
    setErrorOnSaveSB,
  } = useTaskShow({ tasks, dispatch });

  const {
    task: taskForm,
    isModalOpen: isEditModalOpen,
    handleOpenModal: handleOpenEditModal,
    handleCloseModal: handleCloseEditModal,
  } = useTaskForm();

  const {
    isToastOpen,
    areTasksAttached,
    isFetching,
    setIsToastOpen,
    handleCreateTasks,
  } = useTaskAttach({ project, staffId: session?.staff?.id });

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    handleDelete,
    handleDeleteMultiple,
    openDeleteConfirmation,
    setDeleteConfirmed,
    setDeleteIds,
    deleteIds,
  } = useDeleteRow(destroy, destroyMany);

  useEffect(() => {
    getAll({
      "filter[taskable_id]": project.id,
      "filter[taskable_type]": "project",
      sort: "milestone_order",
      include: ["assigneds", "tags", "status", "dependencies", "author"],
    }).then((data) => {
      setTasks(data.data.tasks);
      setIsLoading(false);
    });
  }, [project]);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = tasks[dragIndex];
    const updatedRows = update(tasks, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    const mappedRows = updatedRows.map((row, index) => ({
      ...row,
      milestone_order: index + 1,
    }));

    setTasks(mappedRows);

    editSteps({ tasks: mappedRows });
  };

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

  const renderAttachSnackbar = () => (
    <MDSnackbar
      color={areTasksAttached ? "success" : "warning"}
      icon="info"
      title={
        areTasksAttached
          ? "Tareas creadas correctamente"
          : "Las tareas ya han sido creadas"
      }
      content={
        areTasksAttached
          ? "Se han creado todas las tareas del proceso correctamente"
          : "No se han creado tareas, ya han sido creadas en su totalidad"
      }
      open={isToastOpen}
      onClose={() => setIsToastOpen(false)}
      close={() => setIsToastOpen(false)}
      bgWhite
    />
  );

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "N° de Paso",
      accessor: "milestone_order",
    },
    {
      Header: "Nombre",
      accessor: "name",
      width: "40%",
      Cell: ({ row }) => (
        <MDBox>
          {row.original.isBlocked ? (
            <MDBox width="100%" display="flex" justifyContent="start">
              <MDTypography variant="body2" color="dark" fontSize="small">
                {row.original.name}
                <MDBadge
                  variant="contained"
                  color={getStatusColor(row.original.status.id)}
                  size="md"
                  badgeContent={row.original.status.name}
                  sx={{ ml: 2 }}
                />
                <MDBadge
                  variant="contained"
                  color={getPriorityColor(row.original.priority.name)}
                  size="md"
                  badgeContent={row.original.priority.name}
                />
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
                <MDBadge
                  variant="contained"
                  color={getStatusColor(row.original.status.id)}
                  size="md"
                  badgeContent={row.original.status.name}
                  sx={{ ml: 2 }}
                />
                <MDBadge
                  variant="contained"
                  color={getPriorityColor(row.original.priority.name)}
                  size="md"
                  badgeContent={row.original.priority.name}
                />
              </MDTypography>
            </MDBox>
          )}
          {row.original.assigneds?.length > 0 && (
            <MDBox display="flex" flexDirection="column" my={2}>
              {row.original.assigneds?.map((staff) => (
                <Link
                  key={staff.id}
                  href={`/staffs/${staff.id}`}
                  sx={{ cursor: "pointer", color: "info", my: 2, mr: 2 }}
                >
                  {staff.name}
                </Link>
              ))}
            </MDBox>
          )}
          {row.original.dependencies?.length > 0 && (
            <MDBox display="flex">
              {row.original.dependencies.map((dependency) => (
                <MDBadge
                  key={dependency.id}
                  variant="gradient"
                  color={
                    dependency.status_id === DONE_STATUS_ID ? "success" : "dark"
                  }
                  size="sm"
                  badgeContent={`#${dependency.milestone_order}`}
                  container={true}
                  sx={{ mr: 1, my: 1, cursor: "pointer" }}
                  onClick={() => handleOpenShowModal(dependency.id)}
                />
              ))}
            </MDBox>
          )}
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
      Header: "Acciones",
      disableSortBy: true,
      accessor: "",
      Cell: ({ row }) => (
        <MDBox display="flex">
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
          {currentTimer?.task_id === row.original.id ? (
            <Tooltip title="Detener temporizador">
              <LockClockOutlined
                color="error"
                fontSize="medium"
                onClick={() => stopTimer(currentTimer.id)}
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

  return isLoading ? (
    <Loader />
  ) : (
    <MDBox width="100%">
      {renderAttachSnackbar()}
      {renderSaveSnackbar()}
      <MDBox display="flex" justifyContent="flex-end" mr={2} mt={-6}>
        <MDBox display="flex" gap={5} justifyContent="flex-end">
          {project && (
            <Tooltip title="Solamente se puede crear desde el proceso si el caso tiene un departamento y un proceso">
              <MDBox>
                <MDButton
                  variant="gradient"
                  color={"info"}
                  disabled={
                    !project?.responsiblePerson ||
                    !project?.process ||
                    isFetching
                  }
                  onClick={handleCreateTasks}
                >
                  Crear tareas desde el proceso
                </MDButton>
              </MDBox>
            </Tooltip>
          )}
          <MDButton
            variant="gradient"
            color={darkMode ? "light" : "dark"}
            onClick={() => handleOpenEditModal()}
          >
            Crear nueva tarea
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            disabled={deleteIds.length === 0}
            onClick={handleDeleteMultiple}
          >
            Eliminar Múltiples
          </MDButton>
        </MDBox>
        {isEditModalOpen && (
          <Modal
            open={isEditModalOpen}
            onClose={handleCloseEditModal}
            width="40%"
            height="85%"
          >
            <ModalContentForm
              project={project}
              mode={taskForm ? MODAL_TYPES.EDIT : MODAL_TYPES.CREATE}
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
                  project,
                  isSaving,
                  currentTimerId: currentTimer?.id,
                  isTimerStarted: currentTimer?.task_id === taskShow.id,
                  markAsCompleted: handleCompleteTask,
                  stopTimer,
                  startTimer,
                  getSelectedFork,
                  handleSaveTask,
                  closeShowModal: handleCloseShowModal,
                }}
              />
            )}
          </Modal>
        )}
      </MDBox>
      <MDBox mt={3}>
        <DataTable
          table={table}
          showTotalEntries={false}
          isSorted={false}
          moveRow={moveRow}
          noEndBorder
          isTaskTable={true}
          entriesPerPage={{
            defaultValue: 50,
            entries: [5, 10, 15, 20, 25, 50],
          }}
          canMultiSelect={true}
          setDeleteIds={setDeleteIds}
        />
      </MDBox>
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
