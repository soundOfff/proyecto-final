import { useState, useEffect } from "react";
import Card from "/components/Kanban/components/Card";
import _, { moveCard } from "@asseinfo/react-kanban";
import { update } from "/actions/tasks";
import { setSnackbar } from "/context";
import { editSteps } from "/actions/tasks";

import {
  DONE_STATUS_ID,
  IN_PROGRESS_ID,
  PENDING_ID,
  DONE_STATUS,
  IN_PROGRESS,
  PENDING,
} from "/utils/constants/taskStatuses";

export default function useKanban({
  tasks,
  handleOpenShowModal,
  handleOpenEditModal,
  refetch,
  dispatch,
}) {
  const [board, setBoard] = useState({ columns: [] });

  const updateMilestoneOrder = async (board) => {
    const tasksUpdated = [];
    let doneCount = 0;
    let inProgressCount = 0;

    board.columns.forEach((column) => {
      if (column.id === DONE_STATUS_ID) {
        doneCount = Number(column.cards.length);
      }
      if (column.id === IN_PROGRESS_ID) {
        inProgressCount = Number(column.cards.length);
      }
    });

    board.columns.forEach((column) => {
      column.cards.forEach((card, index) => {
        if (column.id === DONE_STATUS_ID) {
          tasksUpdated.push({
            id: card.id,
            milestone_order: index + 1,
          });
        } else if (column.id === IN_PROGRESS_ID) {
          tasksUpdated.push({
            id: card.id,
            milestone_order: doneCount + index + 1,
          });
        } else if (column.id === PENDING_ID) {
          tasksUpdated.push({
            id: card.id,
            milestone_order: doneCount + inProgressCount + index + 1,
          });
        }
      });
    });

    await editSteps({ tasks: tasksUpdated });
  };

  const handleCardMove = async (draggingCard, source, destination) => {
    if (draggingCard.template.props.task.isBlocked) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Acción no disponible",
        content: "No se puede mover una tarea bloqueada",
        bgWhite: true,
      });
      const updatedBoard = moveCard(board, source, {
        toPosition: source.fromPosition,
        toColumnId: source.fromColumnId,
      });
      setBoard(updatedBoard);
    } else {
      const updatedBoard = moveCard(board, source, destination);
      setBoard(updatedBoard);
      await update(draggingCard.id, { task_status_id: destination.toColumnId });
      await updateMilestoneOrder(updatedBoard);
      await refetch();
    }
  };

  useEffect(() => {
    const initialValue = {
      [PENDING_ID]: { id: PENDING_ID, title: PENDING, cards: [] },
      [IN_PROGRESS_ID]: { id: IN_PROGRESS_ID, title: IN_PROGRESS, cards: [] },
      [DONE_STATUS_ID]: { id: DONE_STATUS_ID, title: DONE_STATUS, cards: [] },
    };

    const board = {
      columns: Object.values(
        tasks.reduce((acc, task) => {
          acc[task.status_id].id = task.status.id;
          acc[task.status_id].title = task.status.name;
          acc[task.status_id].cards.push({
            id: task.id,
            template: (
              <Card
                task={task}
                refetch={refetch}
                handleOpenShowModal={handleOpenShowModal}
                handleOpenEditModal={handleOpenEditModal}
              />
            ),
          });

          return acc;
        }, initialValue)
      ),
    };

    setBoard(board);
  }, [tasks, refetch]);

  return { board, setBoard, handleCardMove };
}
