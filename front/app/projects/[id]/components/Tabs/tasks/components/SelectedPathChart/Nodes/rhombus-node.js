"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

import { getStatusColor, getPriorityColor } from "/utils/project-state-colors";
import { Icon } from "@mui/material";

export default function RhombusNode({ data }) {
  return (
    <MDBox
      sx={(theme) => ({
        py: 0,
        border: "3px solid",
        borderRadius: "0%",
        transform: "rotate(45deg)",
        width: "80px",
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      })}
      bgColor="info"
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          margin: "38px -2px",
        }}
      />
      <MDBox
        display="block"
        sx={{ transform: "rotate(-45deg)", textAlign: "center" }}
      >
        <MDTypography
          variant="caption"
          color="light"
          sx={{
            maxWidth: "150px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            textWrap: "nowrap",
          }}
        >
          {data.name}
        </MDTypography>
      </MDBox>
      <Handle
        type="source"
        id="right"
        key="right"
        position={null}
        style={{
          marginLeft: "78px",
          marginBottom: "-78px",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="bellow"
        key="bellow"
        style={{
          margin: "-38px -2px",
        }}
      />
    </MDBox>
  );
}
