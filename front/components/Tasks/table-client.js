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

  const {
    optimisticRows,
    task,
    openShowModal,
    openEditModal,
    stopTimer,
    startTimer,
    isToastOpen,
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
  } = useTaskTable({ rows, dispatch, project, statuses });

  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    handleDeleteMultiple,
    openDeleteConfirmation,
    setDeleteConfirmed,
    setDeleteIds,
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

  const { data: session } = useSession();

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
      Cell: ({ row }) => (
        <Autocomplete
          value={statuses.find((status) => status.id == row.original.status.id)}
          onChange={(e, status) => {
            handleStatusChange(row.original.id, status.id);
          }}
          disabled={row.original.isBlocked}
          options={statuses}
          sx={{ width: "150px" }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput {...params} variant="standard" fullWidth />
          )}
        />
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
        <Autocomplete
          value={priorities.find(
            (priority) => priority.id === row.original.priority.id
          )}
          onChange={(e, priority) => {
            handlePriorityChange(row.original.id, priority.id);
          }}
          options={priorities}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
          sx={{ width: "150px" }}
        />
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
        color="success"
        icon="info"
        title="Tareas creadas correctamente"
        content="Se han creado todas las tareas del proceso correctamente"
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        close={() => setIsToastOpen(false)}
        bgWhite
      />
      <MDBox display="flex" justifyContent="flex-end" mr={5} mt={2}>
        <MDBox width="100%" display="flex" gap={5} justifyContent="flex-end">
          {project && (
            <Tooltip title="Solamente se puede crear desde el proceso si el caso tiene un responsable, un departamento y un proceso">
              <MDBox>
                <MDButton
                  variant="gradient"
                  color={"info"}
                  disabled={
                    !project?.responsiblePerson ||
                    !project?.serviceType?.processes[0] ||
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
            sx={{ overflow: "scroll" }}
          >
            {task && (
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
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </MDBox>
  );
}
