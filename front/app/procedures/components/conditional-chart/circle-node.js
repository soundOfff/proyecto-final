"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function CircleNode({ data }) {
  return (
    <MDBox
      sx={{
        py: 0,
        border: "3px solid",
        borderRadius: "50%",
        width: "73px",
        height: "73px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      bgColor="success"
    >
      <Handle type="target" position={Position.Left} style={{}} />
      <MDBox display="block" sx={{ textAlign: "center" }}>
        <MDTypography
          variant="body2"
          color="light"
          sx={{
            maxWidth: "120px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          END
        </MDTypography>
      </MDBox>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          bottom: -10,
        }}
      />
    </MDBox>
  );
}
