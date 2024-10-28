import { useEffect, useState } from "react";
import { setCurrentTimer } from "/context";
import { store as storeTimer, update as updateTimer } from "/actions/timers";
import { getCurrentTimer } from "/actions/timers";
import moment from "moment";
import { DONE_STATUS } from "/utils/constants/taskStatuses";
import {
  show,
  update as updateTask,
  getTaskStatus as getAllStatuses,
} from "/actions/tasks";
import { setSnackbar } from "/context";

export default function useTaskShow({ tasks, dispatch, refetch = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const handleOpenModal = async (id) => {
    setIsModalOpen(true);
    if (id) {
      setIsLoading(true);
      const task = await show(id, {
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
          "requiredFields",
          "procedure.actions.type",
        ],
      });
      setIsLoading(false);
      setTask(task);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTask(null);
  };

  const getSelectedFork = (children = []) => {
    // Check if the task has a fork selected
    let selectedFork = null;
    children.forEach((child) => {
      if (
        tasks.some(
          (task) => task.procedure && task.procedure.process.id === child.id
        )
      ) {
        selectedFork = child;
      }
    });
    return selectedFork;
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

  const handleCompleteTask = async (taskId) => {
    const doneState = statuses.find((status) => status.name === DONE_STATUS);
    if (taskId === doneState) {
      return;
    }
    await updateTask(taskId, {
      task_status_id: statuses.find((status) => status.name === DONE_STATUS)
        ?.id,
    });
    setOpenModal(false);
  };

  const saveTask = async (taskId, data) => {
    if (!data || !taskId) return;
    setIsSaving(true);
    try {
      await updateTask(taskId, data);
      setSnackbar(dispatch, {
        color: "success",
        icon: "info",
        title: "La tarea fue actualizada correctamente",
        content: "Se ha actualizado la tarea correctamente",
        bgWhite: true,
      });
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "info",
        title: "La tarea no fue actualizada correctamente",
        content:
          "No se ha podido actualizar la tarea, por favor intente nuevamente",
        bgWhite: true,
      });
      console.log(error);
    }
    setIsSaving(false);
    handleCloseModal();
  };

  const handleSaveTask = async (taskId, data) => {
    await saveTask(taskId, data);
    handleCloseModal();
    refetch();
  };

  useEffect(() => {
    getAllStatuses().then((statuses) => setStatuses(statuses));
  }, []);

  return {
    task,
    isLoading,
    isModalOpen,
    isSaving,
    handleOpenModal,
    handleCloseModal,
    setTask,
    handleCompleteTask,
    getSelectedFork,
    stopTimer,
    startTimer,
    handleSaveTask,
  };
}
