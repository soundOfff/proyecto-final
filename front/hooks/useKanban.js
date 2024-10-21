import { useState, useEffect } from "react";
import Card from "/components/Kanban/components/Card";
import _, { moveCard } from "@asseinfo/react-kanban";
import { update } from "/actions/tasks";

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
  currentTimer,
  handleOpenShowModal,
  refetch,
  startTimer,
  stopTimer,
}) {
  const [board, setBoard] = useState({ columns: [] });

  const handleCardMove = async (draggingCard, source, destination) => {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
    await update(draggingCard.id, { task_status_id: destination.toColumnId });
    if (
      destination.toColumnId === DONE_STATUS_ID ||
      source.fromColumnId === DONE_STATUS_ID
    ) {
      refetch();
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
                currentTimer={currentTimer}
                refetch={refetch}
                startTimer={startTimer}
                stopTimer={stopTimer}
                onClick={() => {
                  if (!task.isBlocked) {
                    handleOpenShowModal(task.id);
                  }
                }}
              />
            ),
          });

          return acc;
        }, initialValue)
      ),
    };

    setBoard(board);
  }, [tasks, currentTimer, refetch]);

  return { board, setBoard, handleCardMove };
}
