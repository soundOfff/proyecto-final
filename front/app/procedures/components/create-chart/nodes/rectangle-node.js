"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function RectangleNode({ data }) {
  return (
    <MDBox
      sx={(_) => ({
        px: 4,
        py: 1,
        border: "3px solid",
        borderColor: "black",
        borderRadius: "10px",
      })}
    >
      <Handle type="target" position={Position.Left} />
      {data.hasBackEdge && (
        <Handle type="source" id="top" key="top" position={Position.Top} />
      )}
      <MDBox display="block">
        <MDTypography
          variant="body2"
          color="textSecondary"
          sx={{
            width: "200px",
            maxHeight: "80px",
          }}
        >
          {data.name}
        </MDTypography>
      </MDBox>
      <Handle type="source" id="right" key="right" position={Position.Right} />
    </MDBox>
  );
}
