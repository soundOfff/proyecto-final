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
        background: theme.palette.background.paper,
        border: "3px solid",
        borderColor: "green",
        borderRadius: "0%",
        transform: "rotate(45deg)",
        width: "120px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      })}
    >
      <Handle
        type="target"
        position={null}
        style={{
          marginRight: "118px",
          marginBottom: "118px",
        }}
      />
      {/* <MDBadge
        size="xs"
        color={getPriorityColor(task.priority.name)}
        badgeContent={task.priority.name}
        container
      /> */}
      <MDBox
        display="block"
        sx={{ transform: "rotate(-45deg)", textAlign: "center" }}
      >
        <MDTypography
          variant="body2"
          color="textSecondary"
          sx={{
            maxWidth: "150px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            textWrap: "nowrap",
          }}
        >
          #{data.name}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" mt={1} sx={{ transform: "rotate(-45deg)" }}>
        <MDTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
          <Icon sx={{ fontWeight: "bold" }}>event</Icon>
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          {/* &nbsp;{task.start_date} / {task.due_date ?? "----"} */}
        </MDTypography>
      </MDBox>
      <Handle
        type="source"
        position={null}
        style={{
          marginLeft: "118px",
          marginBottom: "-118px",
        }}
      />
    </MDBox>
  );
}
