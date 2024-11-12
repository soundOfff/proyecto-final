"use client";

import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

import { Icon } from "@mui/material";

export default function CircleNode({ data }) {
  return (
    <MDBox
      sx={(theme) => ({
        py: 0,
        background: theme.palette.background.paper,
        border: "3px solid",
        borderColor: "green",
        borderRadius: "50%",
        width: "120px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      })}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          top: -10,
        }}
      />

      <MDBox display="block" sx={{ textAlign: "center" }}>
        <MDTypography
          variant="body2"
          color="textSecondary"
          sx={{
            maxWidth: "120px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          #{data.name}
        </MDTypography>
      </MDBox>

      <MDBox display="flex" mt={1}>
        <MDTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
          <Icon sx={{ fontWeight: "bold" }}>event</Icon>
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          {/* &nbsp;{data.start_date} / {data.due_date ?? "----"} */}
        </MDTypography>
      </MDBox>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          bottom: -10,
        }}
      />
    </MDBox>
  );
}
