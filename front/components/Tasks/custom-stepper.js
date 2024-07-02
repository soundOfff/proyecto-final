import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import MDProgress from "/components/MDProgress";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

import { DONE_STATUS_ID } from "/utils/constants/taskStatuses";

const StyledStepper = styled("ul")({
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-around",
  padding: 0,
  width: "100%",
});
const StyledStepperStep = styled("li")({
  position: "relative",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
});
const StyledStepperStepIndex = styled("div")(() => ({
  display: "block",
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  borderRadius: "50%",
  background: "blue !important",
  color: "#fff",
  textAlign: "center",
  marginBottom: "5px",
}));
const StyledLabelContainer = styled("div")({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
});

function CustomStepper({ processes, tasks }) {
  const completedTasks = useCallback(
    () => tasks.filter((task) => task.status_id === DONE_STATUS_ID),
    [tasks]
  );

  const ProgressBar = ({ totalTasks, completedTasks }) => {
    const percentage = (completedTasks / totalTasks) * 100;
    return (
      <MDBox
        sx={{
          flex: "1 1 auto",
          position: "absolute",
          top: 12,
          left: "calc(-50% + 30px)",
          right: "calc(50% + 30px)",
        }}
      >
        <MDProgress color="info" value={percentage} />
      </MDBox>
    );
  };

  function renderStep(process, key) {
    const totalTasks = process.realStepQuantity;
    const totalCompletedProcessTasks = completedTasks().filter(
      (task) => task.procedure.process.id === process.id
    ).length;

    // Needed because the component is builded like (progress bar) + (node)
    // and we need the value of the completed tasks in the prev process
    const totalPrevTasks = key === 0 ? 1 : processes[key - 1].realStepQuantity;
    const totalPrevCompletedTasks =
      key === 0
        ? 0
        : completedTasks().filter(
            (task) => task.procedure.process.id === processes[key - 1].id
          ).length;

    return (
      <StyledStepperStep key={key}>
        <StyledLabelContainer>
          <StyledStepperStepIndex>
            <MDTypography variant="caption" fontWeight="bold" color="white">
              {key !== processes.length - 1
                ? `${totalCompletedProcessTasks}/${totalTasks}`
                : `${completedTasks().length}/${tasks.length}`}
            </MDTypography>
          </StyledStepperStepIndex>
          <MDTypography variant="caption" color="dark">
            {process.name}
          </MDTypography>
        </StyledLabelContainer>
        {!!key && (
          <ProgressBar
            totalTasks={totalPrevTasks}
            completedTasks={totalPrevCompletedTasks}
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
