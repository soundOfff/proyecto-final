import { useState } from "react";
import { attachTasks } from "/actions/projects";

export default function useTaskAttach({ project, staffId = null }) {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [areTasksAttached, setAreTasksAttached] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleCreateTasks = async () => {
    setIsFetching(true);
    try {
      const { createdTasks } = await attachTasks({
        projectId: project?.id,
        staffId,
      });
      setIsToastOpen(true);
      setAreTasksAttached(Boolean(createdTasks));
    } catch (error) {
      setIsToastOpen(false);
      console.error(error);
    }
    setIsFetching(false);
  };

  return {
    isToastOpen,
    areTasksAttached,
    isFetching,
    setIsToastOpen,
    handleCreateTasks,
  };
}
