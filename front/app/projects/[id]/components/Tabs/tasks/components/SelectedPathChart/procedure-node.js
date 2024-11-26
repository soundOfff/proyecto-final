"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function ProcedureNode({ data }) {
  return (
    <MDBox
      sx={(_) => ({
        px: 4,
        py: 1,
        border: "3px solid",
        borderColor: "black",
        borderRadius: "10px",
      })}
      bgColor={data.isSelected ? "success" : "gray"}
    >
      <Handle type="target" position={Position.Left} />
      {data?.hasBackEdge && (
        <Handle type="source" position={Position.Top} key="top" index="top" />
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
      <Handle type="source" position={Position.Right} />
    </MDBox>
  );
}
