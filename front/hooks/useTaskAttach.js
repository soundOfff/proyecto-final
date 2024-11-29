import { useState } from "react";
import { attachTasks } from "/actions/projects";
import { setSnackbar } from "/context";

export default function useTaskAttach({ project, staffId = null, dispatch }) {
  const [isFetching, setIsFetching] = useState(false);

  const handleCreateTasks = async () => {
    setIsFetching(true);
    try {
      const { createdTasks } = await attachTasks({
        project_id: project?.id,
        staff_id: staffId,
      });
      if (createdTasks) {
        setSnackbar(dispatch, {
          color: "success",
          icon: "info",
          title: "Tareas creadas correctamente",
          content: "Se han creado todas las tareas del proceso correctamente",
          bgWhite: true,
        });
      } else {
        setSnackbar(dispatch, {
          color: "warning",
          icon: "info",
          title: "No se han creado tareas nuevas",
          content: "Ya existen tareas creadas para este proceso",
          bgWhite: true,
        });
      }
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "info",
        title: "Error al crear tareas",
        content:
          "No se han podido crear las tareas, por favor intente nuevamente",
        bgWhite: true,
      });
      console.error(error);
    }
    setIsFetching(false);
  };

  return {
    isFetching,
    handleCreateTasks,
  };
}
