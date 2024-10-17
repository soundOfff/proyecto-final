import { useState } from "react";
import { show } from "/actions/tasks";

export default function useTaskForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState(null);

  const handleOpenModal = async (id) => {
    if (id) {
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
      setTask(task);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTask(null);
  };

  return {
    task,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
}
