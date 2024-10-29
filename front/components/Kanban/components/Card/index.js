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

import { destroy } from "/actions/tasks";

import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";
import { EditNote } from "@mui/icons-material";
import { MODAL_TYPES } from "/utils/constants/modalTypes";

import useTaskForm from "/hooks/useTaskForm";
import ModalContentForm from "/components/ModalContent/Task";
import Modal from "/components/Modal";

export default function Card({ task, refetch, handleOpenShowModal, ...rest }) {
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
    milestone_order,
  } = task;

  const { progress } = useTodo(task.checklistItems);

  const {
    task: taskForm,
    isModalOpen: isEditModalOpen,
    handleOpenModal: handleOpenEditModal,
    handleCloseModal: handleCloseEditModal,
  } = useTaskForm();

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
            mx: 0.5,
          }}
        >
          {!isExternalUrl && !member.profileImage && getInitials(member.name)}
        </MDAvatar>
      </Tooltip>
    );
  });

  return (
    <>
      <MDBox
        {...rest}
        onClick={() => {
          handleOpenShowModal(id);
        }}
      >
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
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
                      dependency.status_id === DONE_STATUS_ID
                        ? "success"
                        : "dark"
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
            <Tooltip title="Editar tarea">
              <EditNote
                color="warning"
                fontSize="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEditModal(task.id);
                }}
                sx={{ mr: 1, cursor: "pointer" }}
              />
            </Tooltip>
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
          </MDBox>
        </MDBox>
        <MDBox my={1}>
          <MDTypography variant="body2" color="text" mb={1}>
            #{milestone_order}
          </MDTypography>
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
      {isEditModalOpen && (
        <Modal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          width="40%"
          height="85%"
        >
          <ModalContentForm
            task={taskForm}
            mode={MODAL_TYPES.EDIT}
            refetch={refetch}
          />
        </Modal>
      )}
    </>
  );
}
