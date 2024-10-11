"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";

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
import { DataProvider } from "/providers/DataProvider";
import Show from "./show";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";
import { editSteps } from "/actions/tasks";
import update from "immutability-helper";
import useTaskTable from "/hooks/useTaskTable";
import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { getPriorityColor, getStatusColor } from "/utils/project-state-colors";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Table({
  statuses,
  priorities,
  project,
  repeats,
  staffs,
  taskableItems,
  tagsData,
  dependencyTasks,
  partners,
  actionsData,
  filters,
  tableFields,
  currentTaskId,
  notificationPriorities = [],
}) {
  const [controller, dispatch] = useMaterialUIController();
  const { currentTimer, darkMode } = controller;
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCancelling, startTransition] = useTransition();

  const {
    optimisticRows,
    task,
    openShowModal,
    openEditModal,
    stopTimer,
    startTimer,
    isToastOpen,
    areTasksAttached,
    isFetching,
    setOpenEditModal,
    handleCloseEditModal,
    handleCloseShowModal,
    getSelectedFork,
    handleCompleteTask,
    setIsToastOpen,
    setTaskId,
    handleCreateTasks,
    setOpenShowModal,
    isLoadingShow,
    saveTask,
    isSaving,
    successOnSaveSB,
    setSuccessOnSaveSB,
    errorOnSaveSB,
    setErrorOnSaveSB,
  } = useTaskTable({
    rows,
    dispatch,
    project,
    statuses,
    staffId: session?.staff?.id,
  });

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
      ...filters,
      sort: "milestone_order",
      include: ["assigneds", "tags", "status", "dependencies", "author"],
    }).then((data) => {
      setRows(data.data.tasks);
      setIsLoading(false);
    });
  }, [project, setIsLoading]);

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = rows[dragIndex];
    const updatedRows = update(rows, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });

    setRows(
      updatedRows.map((row, index) => ({
        ...row,
        milestone_order: index + 1,
      }))
    );

    editSteps({ tasks: rows });
  };

  const handleOpenShowModal = (id) => {
    setTaskId(id);
    setOpenShowModal(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("taskId", id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const closeShowModal = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("taskId");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

    if (taskId !== task?.id && !isCancelling) {
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
                  badgeContent={`#${dependency.id}`}
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

  const table = { columns, rows: optimisticRows };

  return isLoading ? (
    <Loader />
  ) : (
    <MDBox width="100%">
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
      {renderSaveSnackbar()}
      <MDBox display="flex" justifyContent="flex-end" mr={2} mt={-9}>
        <MDBox width="50%" display="flex" gap={5} justifyContent="flex-end">
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
            onClick={() => {
              setOpenEditModal(true);
            }}
          >
            Crear nueva tarea
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            disabled={deleteIds.length === 0}
            onClick={() => {
              handleDeleteMultiple();
            }}
          >
            Eliminar Múltiples
          </MDButton>
        </MDBox>
        {openEditModal && (
          <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            width="40%"
            height="85%"
          >
            <ModalContentForm
              priorities={priorities}
              repeats={repeats}
              taskableItems={taskableItems}
              dependencyTasks={dependencyTasks}
              tagsData={tagsData}
              partners={partners}
              task={task}
              staffs={staffs}
              actionsData={actionsData}
              tableFields={tableFields}
              project={project}
              mode={task ? MODAL_TYPES.EDIT : MODAL_TYPES.CREATE}
            />
          </Modal>
        )}
        {openShowModal && (
          <Modal
            open={openShowModal}
            onClose={closeShowModal}
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
                  project,
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
            defaultValue: 10,
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
