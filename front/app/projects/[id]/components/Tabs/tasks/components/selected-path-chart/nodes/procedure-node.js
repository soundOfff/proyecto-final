"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function ProcedureNode({ data }) {
  return (
    <MDBox
      sx={(theme) => ({
        px: 4,
        py: 1,
        border: "3px solid",
        borderColor: "black",
        borderRadius: "10px",
        background: data.isSelected
          ? theme.palette["success"].main
          : theme.palette["grey"][300],
      })}
    >
      <Handle type="target" position={Position.Left} />
      {data.hasBackEdge && (
        <Handle type="source" id="top" key="top" position={Position.Top} />
      )}
      <MDBox display="block">
        <MDTypography
          variant="body2"
          sx={{
            width: "200px",
            maxHeight: "80px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {data.name}
        </MDTypography>
      </MDBox>
      <Handle type="source" position={Position.Right} />
    </MDBox>
  );
}
