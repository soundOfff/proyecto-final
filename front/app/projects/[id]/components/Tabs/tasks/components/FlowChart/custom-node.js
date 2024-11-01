"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

import { getStatusColor, getPriorityColor } from "/utils/project-state-colors";
import { Icon } from "@mui/material";

function CustomNode({ data: task }) {
  return (
    <MDBox
      sx={(theme) => ({
        px: 4,
        py: 1,
        background: theme.palette.background.paper,
        border: "3px solid",
        borderColor: theme.palette[getStatusColor(task.status_id)].main,
        borderRadius: "10px",
      })}
    >
      <Handle type="target" position={Position.Top} />
      <MDBadge
        size="xs"
        color={getPriorityColor(task.priority.name)}
        badgeContent={task.priority.name}
        container
      />
      <MDBox display="flex">
        <MDTypography variant="body2" color="textSecondary">
          #{task.milestone_order} - {task.name}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" mt={1}>
        <MDTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
          <Icon sx={{ fontWeight: "bold" }}>event</Icon>
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          &nbsp;{task.start_date} / {task.due_date ?? "----"}
        </MDTypography>
      </MDBox>
      <Handle type="source" position={Position.Bottom} />
    </MDBox>
  );
}

export default memo(CustomNode);

CustomNode.displayName = "CustomNode";
