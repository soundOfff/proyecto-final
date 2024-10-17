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
import { Tooltip } from "@mui/material";

export default function Card({ task }) {
  const { image, priority, name, filesCount, assigneds } = task;

  const { progress } = useTodo(task.checklistItems);

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
          size="md"
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
            fontSize: "20px",
          }}
        >
          {!isExternalUrl && !member.profileImage && getInitials(member.name)}
        </MDAvatar>
      </Tooltip>
    );
  });

  return (
    <>
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
      <MDBadge
        size="xs"
        color={getPriorityColor(priority.name)}
        badgeContent={priority.name}
        container
      />
      <MDBox mt={1} mb={2}>
        <MDTypography variant="body2" color="text">
          {name}
        </MDTypography>
        {progress > 0 && (
          <MDBox mt={0.25}>
            <MDProgress variant="gradient" value={progress} color="success" />
          </MDBox>
        )}
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center" color="text">
          <MDTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
            <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
          </MDTypography>
          <MDTypography variant="button" fontWeight="regular" color="text">
            &nbsp;{filesCount}
          </MDTypography>
        </MDBox>
        <MDBox display="flex">{renderMembers}</MDBox>
      </MDBox>
    </>
  );
}
