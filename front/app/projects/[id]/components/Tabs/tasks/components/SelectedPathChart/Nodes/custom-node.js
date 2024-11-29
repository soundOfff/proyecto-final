"use client";

// import CircleNode from "./circle-node";
import ProcedureNode from "./procedure-node";
import TaskNode from "./task-node";
import RhombusNode from "./rhombus-node";
import { memo } from "react";
function CustomNode({ data }) {
  return data.isConditional ? (
    <RhombusNode data={data} />
  ) : data.task ? (
    <TaskNode data={data} />
  ) : (
    <ProcedureNode data={data} />
  );
}

export default memo(CustomNode);

CustomNode.displayName = "CustomNode";
