import { TableRow } from "@mui/material";
import DataTableBodyCell from "./DataTableBodyCell";
import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import DehazeIcon from "@mui/icons-material/Dehaze";

export default function DataTableRow({
  index,
  rows,
  row,
  noEndBorder,
  moveRow,
  isTaskTable = false,
  isNotificable = false,
}) {
  const DND_ITEM_TYPE = "row";
  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { index },
    type: DND_ITEM_TYPE,
    scroll: false,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(dropRef));
  drag(dragRef);

  const getNotificationRowColor = () => {
    if (row.original.isSeen) return "white";
    return "#eee7e7";
  };

  const getLevelColor = () => {
    if (!row.original.procedure) return "white";

    let currentColor = "rgb(225, 225, 225, 0.4)";
    let previousProcessId = null;

    for (let i = 0; i < rows.length; i++) {
      const currentRow = rows[i];
      const currentProcessId =
        currentRow.original.procedure &&
        currentRow.original.procedure.process.id;

      if (currentProcessId !== previousProcessId) {
        currentColor =
          currentColor === "rgb(225, 225, 225, 0.4)"
            ? "rgb(180, 210, 255, 0.4)"
            : "rgb(225, 225, 225, 0.4)";
        previousProcessId = currentProcessId;
      }

      if (currentRow.original === row.original) {
        return currentColor;
      }
    }

    return "white";
  };

  const { key: rowKey, rowProps } = row.getRowProps();

  return (
    <TableRow
      key={rowKey}
      {...rowProps}
      ref={dropRef}
      sx={{
        opacity: isDragging ? 0 : 1,
        backgroundColor: isDragging
          ? "#f0f0f0"
          : isTaskTable
          ? getLevelColor()
          : isNotificable
          ? getNotificationRowColor()
          : "white",
        cursor: isDragging ? "grabbing" : "default",
        transition: "all 0.5s ease",
      }}
    >
      {row.cells.map((cell) => {
        const { key, ...cellProps } = cell.getCellProps();

        return (
          <DataTableBodyCell
            key={key}
            noBorder={noEndBorder && rows.length - 1 === index}
            align={cell.column.align ? cell.column.align : "left"}
            {...cellProps}
          >
            {cell.render("Cell")}
          </DataTableBodyCell>
        );
      })}
      {moveRow && (
        <DataTableBodyCell
          dragRef={dragRef}
          noBorder={noEndBorder && rows.length - 1 === index}
        >
          <DehazeIcon fontSize="medium" sx={{ cursor: "pointer" }} />
        </DataTableBodyCell>
      )}
    </TableRow>
  );
}
