"use client";

import dynamic from "next/dynamic";

// @asseinfo/react-kanban components
const Board = dynamic(() => import("@asseinfo/react-kanban"), { ssr: false });

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController } from "/context";
import useKanban from "/hooks/useKanban";
import useTaskShow from "/hooks/useTaskShow";
import Show from "/components/Tasks/show";
import { useDataProvider } from "/providers/DataProvider";
import Modal from "/components/Modal";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Kanban({ tasks, refetch }) {
  const { project } = useDataProvider();
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode, currentTimer } = controller;
  const {
    task: taskShow,
    isLoading: isLoadingShow,
    isModalOpen: isShowModalOpen,
    handleOpenModal: handleOpenShowModal,
    handleCloseModal: handleCloseShowModal,
    isSaving,
    handleCompleteTask,
    getSelectedFork,
    stopTimer,
    startTimer,
    handleSaveTask,
  } = useTaskShow({ tasks, dispatch, refetch });

  const { board, handleCardMove } = useKanban({
    tasks,
    handleOpenShowModal,
    currentTimer,
    refetch,
    startTimer,
    stopTimer,
    dispatch,
  });

  return (
    <MDBox>
      <MDBox
        mt={2}
        position="relative"
        sx={({
          palette: { light, background },
          functions: { pxToRem },
          borders: { borderRadius },
        }) => ({
          "& .react-kanban-column": {
            backgroundColor: darkMode ? background.card : light.main,
            width: pxToRem(450),
            margin: `0 ${pxToRem(10)}`,
            padding: pxToRem(20),
            borderRadius: borderRadius.lg,
          },
        })}
      >
        <Board
          disableColumnDrag
          renderColumnHeader={({ title }) => (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <MDTypography variant="h6">{title}</MDTypography>
            </MDBox>
          )}
          renderCard={({ id, template }, { dragging }) => (
            <MDBox
              key={id}
              dragging={dragging.toString() || undefined}
              display="block"
              width="calc(450px - 40px)"
              bgColor={darkMode ? "transparent" : "white"}
              color="text"
              borderRadius="xl"
              mt={2.5}
              py={1.875}
              px={1.875}
              lineHeight={1.5}
              sx={{
                border: ({ borders: { borderWidth }, palette: { white } }) =>
                  darkMode ? `${borderWidth[1]} solid ${white.main}` : 0,
                fontSize: ({ typography: { size } }) => size.md,
              }}
            >
              {template}
            </MDBox>
          )}
          onCardDragEnd={handleCardMove}
        >
          {board}
        </Board>
      </MDBox>
      {isShowModalOpen && (
        <Modal
          open={isShowModalOpen}
          onClose={handleCloseShowModal}
          px={0}
          py={0}
          width="70%"
          sx={{ overflow: "scroll" }}
        >
          {isLoadingShow || !taskShow ? (
            <Backdrop open={true} sx={{ background: "white" }}>
              <CircularProgress size={80} color="black" />
            </Backdrop>
          ) : (
            <Show
              {...{
                task: taskShow,
                project,
                isSaving,
                currentTimerId: currentTimer?.id,
                isTimerStarted: currentTimer?.task_id === taskShow.id,
                markAsCompleted: handleCompleteTask,
                stopTimer,
                startTimer,
                getSelectedFork,
                handleSaveTask,
                closeShowModal: handleCloseShowModal,
              }}
            />
          )}
        </Modal>
      )}
    </MDBox>
  );
}
