/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Image from "next/image";

// @mui material components
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";
import MDProgress from "/components/MDProgress";
import useTodo from "/hooks/useTodo";

import { getPriorityColor } from "/utils/project-state-colors";
import { Grid, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import { useSession } from "next-auth/react";

import { destroy } from "/actions/tasks";

import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";

export default function Card({
  task,
  currentTimer,
  refetch,
  startTimer,
  stopTimer,
  ...rest
}) {
  const { data: session } = useSession();
  const {
    id,
    image,
    priority,
    name,
    assigneds,
    isBlocked,
    start_date,
    due_date,
    filesCount,
    dependencies,
  } = task;

  const { progress } = useTodo(task.checklistItems);

  const handleDelete = (id) => {
    destroy(id);
    refetch();
  };

  const renderMembers = assigneds.map((member, key) => {
    const imageAlt = `image-${key}`;
    const isExternalUrl =
      member.profileImage &&
      (member.profileImage.startsWith("http://") ||
        member.profileImage.startsWith("https://"));

    return (
      <Tooltip key={member.id} title={member.name}>
        <MDAvatar
          src={
            isExternalUrl
              ? member.profileImage
              : member.profileImage
              ? `/images/staff/${member.profileImage}`
              : undefined
          }
          alt={imageAlt}
          size="sm"
          shadow="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              !member.profileImage && !isExternalUrl ? "grey.400" : undefined,
            color: !member.profileImage && !isExternalUrl ? "white" : undefined,
            textAlign: "center",
            lineHeight: "initial",
          }}
        >
          {!isExternalUrl && !member.profileImage && getInitials(member.name)}
        </MDAvatar>
      </Tooltip>
    );
  });

  return (
    <MDBox {...rest}>
      {image && (
        <MDBox width="100%" borderRadius="lg" mb={1} overflow="hidden">
          <Image
            src={image}
            alt="image"
            quality={100}
            sizes="100%"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </MDBox>
      )}
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex">
          <MDBadge
            size="xs"
            color={getPriorityColor(priority.name)}
            badgeContent={priority.name}
            container
          />
        </MDBox>
        <MDBox display="flex">
          {dependencies?.length > 0 && (
            <MDBox display="flex">
              {dependencies.map((dependency) => (
                <MDBadge
                  key={dependency.id}
                  variant="gradient"
                  color={
                    dependency.status_id === DONE_STATUS_ID ? "success" : "dark"
                  }
                  size="sm"
                  badgeContent={`#${dependency.milestone_order}`}
                  container={true}
                  sx={{ mr: 1, cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenShowModal(dependency.id);
                  }}
                />
              ))}
            </MDBox>
          )}
          <Tooltip title="Eliminar tarea">
            <DeleteIcon
              color="error"
              fontSize="medium"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(id);
              }}
              sx={{
                mx: 1,
                cursor: "pointer",
                display: isBlocked ? "none" : "block",
              }}
            />
          </Tooltip>
          {currentTimer?.task_id === id ? (
            <Tooltip title="Detener temporizador">
              <LockClockOutlined
                color="error"
                fontSize="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  stopTimer(currentTimer.id);
                }}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  display: isBlocked ? "none" : "block",
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Iniciar temporizador">
              <AccessAlarm
                color="success"
                fontSize="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  startTimer(id, session.staff.id);
                }}
                sx={{
                  ml: 1,
                  cursor: "pointer",
                  display: isBlocked ? "none" : "block",
                }}
              />
            </Tooltip>
          )}
        </MDBox>
      </MDBox>
      <MDBox my={1}>
        <MDTypography variant="body2" color="text" mb={1}>
          {name}
        </MDTypography>
        {progress > 0 && (
          <MDBox my={2}>
            <MDProgress variant="gradient" value={progress} color="success" />
          </MDBox>
        )}
        <MDBox display="flex" mt={1}>
          <MDTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
            <Icon sx={{ fontWeight: "bold" }}>event</Icon>
          </MDTypography>
          <MDTypography variant="button" fontWeight="regular" color="text">
            &nbsp;{start_date} / {due_date ?? "----"}
          </MDTypography>
        </MDBox>
      </MDBox>
      <Grid container>
        <Grid item xs={6}>
          <MDBox display="flex" gap={2}>
            <Tooltip title="Archivos Adjuntos">
              <MDBox display="flex">
                <MDTypography variant="body2" color="text">
                  <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
                </MDTypography>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                >
                  &nbsp;{filesCount}
                </MDTypography>
              </MDBox>
            </Tooltip>
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="end">
            {renderMembers}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
