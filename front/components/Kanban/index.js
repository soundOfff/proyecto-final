"use client";

import dynamic from "next/dynamic";

// @asseinfo/react-kanban components
const Board = dynamic(() => import("@asseinfo/react-kanban"), { ssr: false });

// react-html-parser components
import parse from "html-react-parser";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController } from "/context";
import Card from "./components/Card";

import {
  DONE_STATUS_ID,
  IN_PROGRESS_ID,
  PENDING_ID,
  DONE_STATUS,
  IN_PROGRESS,
  PENDING,
} from "/utils/constants/taskStatuses";

export default function Kanban({ tasks }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const initialValue = {
    [PENDING_ID]: { id: PENDING_ID, title: PENDING, cards: [] },
    [IN_PROGRESS_ID]: { id: IN_PROGRESS_ID, title: IN_PROGRESS, cards: [] },
    [DONE_STATUS_ID]: { id: DONE_STATUS_ID, title: DONE_STATUS, cards: [] },
  };

  const boardData = Object.values(
    tasks.reduce((acc, task) => {
      acc[task.status_id].id = task.status.id;
      acc[task.status_id].title = task.status.name;
      acc[task.status_id].cards.push({
        id: task.id,
        template: <Card task={task} />,
      });

      return acc;
    }, initialValue)
  );

  const boards = { columns: boardData };

  return (
    <MDBox>
      <MDBox
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
          initialBoard={boards}
          allowAddCard
          allowAddColumn
          renderColumnHeader={({ id, title }, {}) => (
            <>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <MDTypography variant="h6">{title}</MDTypography>
              </MDBox>
            </>
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
              {typeof template === "string" ? parse(template) : template}
            </MDBox>
          )}
          onCardNew={() => null}
        />
      </MDBox>
    </MDBox>
  );
}
