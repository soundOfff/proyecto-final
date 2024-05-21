"use client";

import { show } from "/actions/tasks";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { useMaterialUIController, setCurrentTimer } from "/context";
import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import Modal from "/components/Modal";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import ModalContentForm from "/components/ModalContent/Task/index";
import { Autocomplete, Grid, Link, Tooltip } from "@mui/material";

import { update } from "/actions/tasks";
import { store as storeTimer, update as updateTimer } from "/actions/timers";

import { MODAL_TYPES } from "/utils/constants/modalTypes";
import { destroy } from "/actions/tasks";
import Show from "./show";
import { AccessAlarm, LockClockOutlined } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { getCurrentTimer } from "/actions/timers";
import DeleteRow from "/components/DeleteRow";
import useDeleteRow from "/hooks/useDeleteRow";
import moment from "moment";
import { DONE_STATUS, DONE_STATUS_ID } from "/utils/constants/taskStatuses";

export default function Table({
  rows,
  priorities,
  repeats,
  taskableItems,
  tagsData,
  statuses,
  partners,
  currentTimer,
  currentTaskId,
  partnerId,
}) {
  const [optimisticRows, updateOptimisticRows] = useOptimistic(
    rows,
    (state, editedRow) => {
      const editedRowIndex = state.findIndex((row) => row.id === editedRow.id);
      const newState = [...state];
      newState[editedRowIndex] = editedRow;
      return newState;
    }
  );
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [taskId, setTaskId] = useState(currentTaskId || null);
  const [task, setTask] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);
  const { data: session } = useSession();
  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTaskId(null);
    setTask(null);
  };

  const handleCloseShowModal = () => {
    setOpenShowModal(false);
    setTaskId(null);
    setTask(null);
  };

  const findTask = (taskId) => rows.find((row) => row.id === taskId);

  const handleStatusChange = async (taskId, statusId) => {
    startTransition(async () => {
      const editedRow = findTask(taskId);
      editedRow.status.id = statusId;
      updateOptimisticRows(editedRow);
    });
    await update(taskId, { task_status_id: statusId });
  };

  const handlePriorityChange = async (taskId, priorityId) => {
    startTransition(async () => {
      const editedRow = findTask(taskId);
      editedRow.priority.id = priorityId;
      updateOptimisticRows(editedRow);
    });
    await update(taskId, { task_priority_id: priorityId });
  };

  const stopTimer = async (timerId, note = "") => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    await updateTimer(timerId, { end_time: date, note });
    setCurrentTimer(dispatch, null);
  };

  const startTimer = async (taskId, staffId) => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    await storeTimer({ task_id: taskId, start_time: date, staff_id: staffId });
    const currentTimer = await getCurrentTimer(staffId, {
      include: "task",
    });
    setCurrentTimer(dispatch, currentTimer);
  };

  useEffect(() => {
    const fetchTask = async () => {
      setTask(
        await show(taskId, {
          include: [
            "tags",
            "priority",
            "status",
            "comments",
            "checklistItems",
            "assigneds",
            "followers",
            "taskable",
            "reminders",
          ],
        })
      );
    };
    if (taskId && !task) {
      fetchTask();
    }
  }, [taskId, task]);

  const handleCompleteTask = async (taskId) => {
    const doneState = statuses.find((status) => status.name === DONE_STATUS);
    if (taskId === doneState) {
      return;
    }
    await update(taskId, {
      task_status_id: statuses.find((status) => status.name === DONE_STATUS).id,
    });
    setOpenShowModal(false);
  };

  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Bloqueada por",
      accessor: "isBlocked",
      Cell: ({ row }) =>
        row.original.isBlocked && (
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
      Header: "Acciones",
      accessor: "",
      Cell: ({ row }) => (
        <MDBox display="flex">
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
              sx={{ mx: 1, cursor: "pointer" }}
            />
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
      <MDBox display="flex" justifyContent="flex-end" mb={5}>
        <MDButton
          variant="gradient"
          color={darkMode ? "light" : "dark"}
          onClick={() => {
            setOpenEditModal(true);
          }}
        >
          Crear nueva tarea
        </MDButton>
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
              tagsData={tagsData}
              partners={partners}
              partnerId={partnerId}
              task={task}
              mode={task ? MODAL_TYPES.EDIT : MODAL_TYPES.CREATE}
            />
          </Modal>
        )}
      </MDBox>
      {openShowModal && (
        <Modal
          open={openShowModal}
          onClose={handleCloseShowModal}
          px={0}
          py={0}
          sx={{ overflow: "scroll" }}
        >
          {task && (
            <Show
              task={task}
              markAsCompleted={handleCompleteTask}
              isTimerStarted={currentTimer?.task_id === task.id}
              currentTimerId={currentTimer?.id}
              stopTimer={stopTimer}
              startTimer={startTimer}
            />
          )}
        </Modal>
      )}
      <DataTable
        table={table}
        showTotalEntries={true}
        isSorted={true}
        noEndBorder
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
