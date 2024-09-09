import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import MDCustomProgress from "./CustomProgress";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

import {
  DONE_STATUS_ID,
  IN_PROGRESS_ID,
  PENDING_ID,
} from "/utils/constants/taskStatuses";

const StyledStepper = styled("ul")({
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-around",
  padding: 0,
  marginTop: "15px",
  width: "100%",
});
const StyledStepperStep = styled("li")({
  position: "relative",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-around",
  alignSelf: "start",
  alignItems: "center",
  width: "100%",
});
const StyledStepperStepIndex = styled("div")(() => ({
  display: "block",
  width: "160px",
  height: "30px",
  lineHeight: "30px",
  borderRadius: "0%",
  background: "#fff !important",
  color: "#fff",
  textAlign: "center",
  marginBottom: "10px",
}));

// #cc084b #c87000 #f61200
const StyledLabelContainer = styled("div")({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
});

function CustomStepper({ processes, tasks }) {
  const initialValue = {
    [PENDING_ID]: {},
    [IN_PROGRESS_ID]: {},
    [DONE_STATUS_ID]: {},
    total: 0,
  };

  const taskCounting = useCallback(() =>
    tasks.reduce((acc, task) => {
      acc[task.status_id] = {
        ...acc[task.status_id],
        total: (acc[task.status_id]["total"] || 0) + 1,
        [task.procedure.processId]:
          (acc[task.status_id][task.procedure.process.id] || 0) + 1,
      };
      acc["total"] += 1;
      return acc;
    }, initialValue)
  )();

  const pendingTasks = taskCounting[PENDING_ID];
  const inProgressTasks = taskCounting[IN_PROGRESS_ID];
  const completedTasks = taskCounting[DONE_STATUS_ID];

  const ProgressBar = ({ totalTasks, completedTasks, inProgressTasks }) => {
    const totalPercentage = Math.min(
      ((completedTasks + inProgressTasks) / totalTasks) * 100,
      100
    );

    // Relative % vales of completed tasks, it is used to calculate the progress bar gradient
    // where (inProgressTasks + completedTasks) != totalTasks
    const relativeCompletedPercentage =
      completedTasks + inProgressTasks > 0
        ? (completedTasks / (completedTasks + inProgressTasks)) * 100
        : 0;

    const relativeInProgressPercentage =
      completedTasks + inProgressTasks > 0
        ? (inProgressTasks / (completedTasks + inProgressTasks)) * 100
        : 0;

    return (
      <MDBox
        sx={{
          flex: "1 1 auto",
          position: "absolute",
          margin: "0 40px",
          top: 12,
          left: "calc(-50% + 30px)",
          right: "calc(50% + 30px)",
        }}
      >
        <MDCustomProgress
          variant="buffer"
          color="success"
          multipleColors={true}
          completedValue={relativeCompletedPercentage}
          inProgressValue={relativeInProgressPercentage}
          value={totalPercentage}
        />
      </MDBox>
    );
  };

  function renderStep(process, key) {
    const totalPendingProcessTasks = pendingTasks[process.id] ?? 0;
    const totalInProgressProcessTasks = inProgressTasks[process.id] ?? 0;
    const totalCompletedProcessTasks = completedTasks[process.id] ?? 0;

    const processTasks = tasks.filter(
      (t) => t.procedure.processId == process.id
    );
    const firstProcessTask = processTasks[0];
    const lastProcessTask = processTasks[processTasks.length - 1];

    // Needed because the component is builded like (progress bar) + (node)
    // and we need the value of the completed tasks in the prev process
    const totalPrevTasks = key === 0 ? 1 : processes[key - 1].realStepQuantity;
    const totalPrevCompletedTasks =
      key === 0 ? 0 : completedTasks[processes[key - 1].id] || 0;
    const totalPrevInProgressProcessTasks =
      key === 0 ? 0 : inProgressTasks[processes[key - 1].id] || 0;

    return (
      <StyledStepperStep key={key}>
        <StyledLabelContainer>
          <StyledStepperStepIndex key={key} processesLength={processes.length}>
            <MDBox>
              <MDBadge
                variant="contained"
                badgeContent={
                  key !== processes.length - 1
                    ? `${totalPendingProcessTasks}`
                    : pendingTasks?.total ?? "0"
                }
                color="primary"
                size="md"
                container
                sx={{ ml: 1, height: "2rem" }}
              />
              <MDBadge
                variant="contained"
                badgeContent={
                  key !== processes.length - 1
                    ? `${totalInProgressProcessTasks}`
                    : inProgressTasks?.total ?? "0"
                }
                color="warning"
                size="md"
                container
                sx={{ ml: 1, height: "2rem" }}
              />
              <MDBadge
                variant="contained"
                badgeContent={
                  key !== processes.length - 1
                    ? `${totalCompletedProcessTasks}`
                    : completedTasks?.total ?? "0"
                }
                color="success"
                size="md"
                container
                sx={{ ml: 1, height: "2rem" }}
              />
            </MDBox>
          </StyledStepperStepIndex>
          <MDTypography variant="caption" color="dark">
            {process.name}
          </MDTypography>
          {key != processes.length - 1 && (
            <MDBox mt={1} display="flex" flexDirection="column" gap={1}>
              <MDBox display="flex" gap={2}>
                <MDTypography variant="caption" fontWeight="bold" color="dark">
                  Empieza:
                </MDTypography>
                <MDTypography variant="caption" color="dark">
                  {firstProcessTask.name}
                </MDTypography>
              </MDBox>
              <MDBox display="flex" gap={2}>
                <MDTypography variant="caption" fontWeight="bold" color="dark">
                  Termina:
                </MDTypography>
                <MDTypography variant="caption" color="dark">
                  {lastProcessTask.name}
                </MDTypography>
              </MDBox>
            </MDBox>
          )}
        </StyledLabelContainer>
        {!!key && (
          <ProgressBar
            totalTasks={totalPrevTasks}
            completedTasks={totalPrevCompletedTasks}
            inProgressTasks={totalPrevInProgressProcessTasks}
          />
        )}
      </StyledStepperStep>
    );
  }

  return <StyledStepper>{processes.map(renderStep)}</StyledStepper>;
}

CustomStepper.propTypes = {
  processes: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default CustomStepper;
