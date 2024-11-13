"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
// import MDBadge from "/components/MDBadge";

// import { getStatusColor, getPriorityColor } from "/utils/project-state-colors";
import { Icon } from "@mui/material";

export default function RectangleNode({ data }) {
  return (
    <MDBox
      sx={(theme) => ({
        px: 4,
        py: 1,
        border: "3px solid",
        borderColor: "black",
        borderRadius: "10px",
      })}
    >
      <Handle type="target" position={Position.Left} />
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
      <Handle type="source" position={Position.Right} />
    </MDBox>
  );
}
