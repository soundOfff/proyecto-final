import { startTransition, useEffect, useOptimistic, useState } from "react";
import { setCurrentTimer } from "/context";
import { store as storeTimer, update as updateTimer } from "/actions/timers";
import { getCurrentTimer } from "/actions/timers";
import moment from "moment";
import { DONE_STATUS } from "/utils/constants/taskStatuses";
import { show, update as updateTask } from "/actions/tasks";
import { attachTasks } from "/actions/projects";

export default function useTaskTable({ rows, dispatch, currentTaskId }) {
  const [taskId, setTaskId] = useState(currentTaskId || null);
  const [task, setTask] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [optimisticRows, updateOptimisticRows] = useOptimistic(
    rows,
    (state, editedRow) => {
      const editedRowIndex = state.findIndex((row) => row.id === editedRow.id);
      const newState = [...state];
      newState[editedRowIndex] = editedRow;
      return newState;
    }
  );

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

  const findTask = (taskId) => rows.find((row) => row.id === taskId);

  const handleStatusChange = async (taskId, statusId) => {
    startTransition(async () => {
      const editedRow = findTask(taskId);
      editedRow.status.id = statusId;
      updateOptimisticRows(editedRow);
    });
    await updateTask(taskId, { task_status_id: statusId });
  };

  const handlePriorityChange = async (taskId, priorityId) => {
    startTransition(async () => {
      const editedRow = findTask(taskId);
      editedRow.priority.id = priorityId;
      updateOptimisticRows(editedRow);
    });
    await updateTask(taskId, { task_priority_id: priorityId });
  };

  const handleCompleteTask = async (taskId) => {
    const doneState = statuses.find((status) => status.name === DONE_STATUS);
    if (taskId === doneState) {
      return;
    }
    await updateTask(taskId, {
      task_status_id: statuses.find((status) => status.name === DONE_STATUS).id,
    });
    setOpenShowModal(false);
  };

  const handleCreateTasks = async () => {
    setIsFetching(true);
    try {
      await attachTasks(project?.id);
      setIsToastOpen(true);
    } catch (error) {
      setIsToastOpen(false);
      console.error(error);
    }
    setIsFetching(false);
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
            "dependencies",
            "followers",
            "taskable",
            "reminders",
            "actions",
          ],
        })
      );
    };
    if (taskId && !task) {
      fetchTask();
    }
  }, [taskId, task]);

  return {
    task,
    openEditModal,
    openShowModal,
    optimisticRows,
    isFetching,
    isToastOpen,
    handleCloseEditModal,
    handleCloseShowModal,
    setIsFetching,
    setIsToastOpen,
    setTask,
    setTaskId,
    setOpenEditModal,
    setOpenShowModal,
    handleCompleteTask,
    handlePriorityChange,
    handleStatusChange,
    stopTimer,
    startTimer,
    handleCreateTasks,
  };
}
