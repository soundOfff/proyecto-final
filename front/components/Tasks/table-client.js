"use client";

import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRow from "/hooks/useDeleteRow";
import DeleteRow from "/components/DeleteRow";

import Grid from "@mui/material/Grid";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import Autocomplete from "@mui/material/Autocomplete";

import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";
import { editSteps } from "/actions/tasks";
import update from "immutability-helper";
import useTaskTable from "/hooks/useTaskTable";
import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { getColor, getPriorityColor } from "/utils/project-state-colors";
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
  tableFields,
}) {
  const [controller, dispatch] = useMaterialUIController();
  const { currentTimer, darkMode } = controller;
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { data: session } = useSession();

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
    handleStatusChange,
    getSelectedFork,
    handlePriorityChange,
    handleCompleteTask,
    setIsToastOpen,
    setTaskId,
    handleCreateTasks,
    setOpenShowModal,
    isLoadingShow,
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
  };

  const handleOpenModal = (id) => {
    setTaskId(id);
    setOpenShowModal(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("taskId", id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const removeParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("taskId");
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (rows.length > 0) {
      setTimeout(() => {
        editSteps({ tasks: rows });
      }, 1000);
    }
  }, [rows]);

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
      Header: "Bloqueada por",
      accessor: "isBlocked",
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
            <MDTypography variant="body2" color="dark">
              {row.original.name}
            </MDTypography>
          </MDBox>
        ) : (
          <MDTypography
            variant="body2"
            color="info"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setTaskId(row.original.id);
              setOpenShowModal(true);
            }}
          >
            {row.original.name}
          </MDTypography>
        ),
    },
    {
      Header: "Estado",
      accessor: "status",
      Cell: ({ row }) => {
        return (
          <MDBox display="flex" flexDirection="row" alignItems="center">
            <MDBadge
              variant="contained"
              color={getColor(row.original.status.id)}
              size="md"
              badgeContent={row.original.status.name}
            />
          </MDBox>
        );
      },
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
      Header: "Asignar a",
      accessor: "",
      Cell: ({ row }) => {
        return row.original.staff?.map((staff) => (
          <Link
            key={staff.id}
            href={`/partners/${staff.id}`}
            sx={{ cursor: "pointer", color: "info" }}
          >
            {staff.first_name} {staff.last_name}
          </Link>
        ));
      },
    },
    {
      Header: "Etiquetas",
      accessor: "labels",
      Cell: ({ row }) =>
        row.original.tags &&
        row.original.tags.map((tag) => (
          <Grid key={tag.id}>
            <MDBadge
              variant="gradient"
              color="dark"
              size="md"
              badgeContent={tag.name}
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
      <MDBox display="flex" justifyContent="flex-end" mr={2} mt={-10}>
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
            onClose={() => {
              handleCloseEditModal();
              removeParams();
            }}
            width="80%"
          >
            <ModalContentForm
              priorities={priorities}
              repeats={repeats}
              taskableItems={taskableItems}
              dependencyTasks={dependencyTasks}
              tagsData={tagsData}
              partners={partners}
              task={task}
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
            onClose={handleCloseShowModal}
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
                }}
              >
                <Show />
              </DataProvider>
            )}
          </Modal>
        )}
      </MDBox>
      <DataTable
        table={table}
        showTotalEntries={false}
        isSorted={false}
        moveRow={moveRow}
        noEndBorder
        isTaskTable={true}
        entriesPerPage={{ defaultValue: 50, entries: [5, 10, 15, 20, 25, 50] }}
        canMultiSelect={true}
        setDeleteIds={setDeleteIds}
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
