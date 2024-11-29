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

const MARGIN = { sm: 10, md: 20 };
const PADDING = { sm: 10, md: 20 };
const GAP = {
  sm: `${MARGIN.sm + PADDING.sm}px`,
  md: `${MARGIN.md + PADDING.md}px`,
};
const COLUMN_WIDTHS = {
  xs: "150px", // 0
  sm: "26vw", // 576
  md: "25vw", // 768
  lg: "26vw", // 992
  xl: "25vw", // 1200
  xxl: "21vw", // 1400
  xxxl: "23vw", // 1600
};
const CARD_WIDTHS = {
  xs: `calc(${COLUMN_WIDTHS.xs} - ${GAP.sm})`,
  sm: `calc(${COLUMN_WIDTHS.sm} - ${GAP.sm})`,
  md: `calc(${COLUMN_WIDTHS.md} - ${GAP.sm})`,
  lg: `calc(${COLUMN_WIDTHS.lg} - ${GAP.md})`,
  xl: `calc(${COLUMN_WIDTHS.xl} - ${GAP.md})`,
  xxl: `calc(${COLUMN_WIDTHS.xxl} - ${GAP.md})`,
  xxxl: `calc(${COLUMN_WIDTHS.xxxl} - ${GAP.md})`,
};

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
    stopTimer,
    startTimer,
    handleSaveTask,
  } = useTaskShow({ tasks, dispatch, refetch });

  const { board, handleCardMove } = useKanban({
    tasks,
    handleOpenShowModal,
    refetch,
    dispatch,
  });

  return (
    <MDBox>
      <MDBox
        mt={2}
        position="relative"
        sx={({
          palette: { light, background },
          borders: { borderRadius },
        }) => ({
          "& .react-kanban-board": {
            display: "flex",
            width: "100%",
            alignItems: "inherit !important",
            justifyContent: { sm: "left", xl: "center" },
          },
          "& .react-kanban-column": {
            backgroundColor: darkMode ? background.card : light.main,
            width: COLUMN_WIDTHS,
            margin: { xs: `0 ${MARGIN.sm}px`, lg: `0 ${MARGIN.md}px` },
            padding: { xs: `${PADDING.sm}px`, lg: `${PADDING.md}px` },
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
              bgColor={darkMode ? "transparent" : "white"}
              color="text"
              borderRadius="xl"
              mt={2.5}
              py={2}
              px={2}
              lineHeight={1.5}
              sx={{
                border: ({ borders: { borderWidth }, palette: { white } }) =>
                  darkMode ? `${borderWidth[1]} solid ${white.main}` : 0,
                width: CARD_WIDTHS,
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
                handleSaveTask,
                closeShowModal: handleCloseShowModal,
                refetch,
              }}
            />
          )}
        </Modal>
      )}
    </MDBox>
  );
}
