"use client";

import RectangleNode from "./rectangle-node";
import RhombusNode from "./rhombus-node";

import { memo } from "react";
function CustomNode({ data }) {
  return data.isConditional ? (
    <RhombusNode data={data} />
  ) : (
    <RectangleNode data={data} />
  );
}

export default memo(CustomNode);

CustomNode.displayName = "CustomNode";
