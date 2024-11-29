"use client";

import RectangleNode from "./rectangle-node";
import RhombusNode from "./rhombus-node";
import { memo } from "react";
function CustomNode({ data: task }) {
  return task.isFinalTask ? (
    <RhombusNode task={task} />
  ) : (
    <RectangleNode task={task} />
  );
}

export default memo(CustomNode);

CustomNode.displayName = "CustomNode";
