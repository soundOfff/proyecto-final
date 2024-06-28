import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "@emotion/styled";

// TODO: adapt this for the new use case

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
const StyledStepperStepIndex = styled("div")(({ currentStep, done }) => ({
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  borderRadius: "50%",
  background: currentStep || done ? "orange !important" : "#dedede",
  color: currentStep || done ? "#fff" : "#999",
  textAlign: "center",
  marginBottom: "5px",
}));

const StyledLabelContainer = styled("div")({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
});

function CustomStepper({ processes }) {
  function StepContent({ done, index }) {
    return done ? "✓" : index + 1;
  }

  const ProgressBar = ({ current = 0, step, progress = 0 }) => {
    let value = 0;
    if (current + 1 === step) {
      value = progress;
    } else if (current >= step) {
      value = 100;
    }

    return (
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          "&.MuiLinearProgress-root": {
            flex: "1 1 auto",
            position: "absolute",
            top: 12,
            left: "calc(-50% + 20px)",
            right: "calc(50% + 20px)",
            backgroundColor: "#ffd8ba61",
          },
          "& .MuiLinearProgress-bar": {
            backgroundColor: "orange",
          },
        }}
      />
    );
  };

  function renderStep(process, key) {
    console.log(process);
    const done = 0;
    const currentStep = 0;
    return (
      <StyledStepperStep key={key}>
        <StyledLabelContainer>
          <StyledStepperStepIndex currentStep={currentStep} done={done}>
            <StepContent done={done} index={key} />
          </StyledStepperStepIndex>
        </StyledLabelContainer>
        {!!key && <ProgressBar step={key} />}
      </StyledStepperStep>
    );
  }

  return <StyledStepper>{processes.map(renderStep)}</StyledStepper>;
}

CustomStepper.propTypes = {
  processes: PropTypes.array.isRequired,
};

export default CustomStepper;
