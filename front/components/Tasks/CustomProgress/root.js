import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const GradientLinearProgress = styled(LinearProgress)(
  ({
    theme,
    ownerState,
    multipleColors = false,
    completedPercentage = 0,
    inProgressPercentage = 0,
  }) => {
    const { palette, functions } = theme;
    const { color = "primary", variant = "standard", value = 100 } = ownerState;
    const { text, gradients } = palette;
    const { linearGradient } = functions;

    const backgroundValue =
      variant === "gradient"
        ? gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state)
        : palette[color]
        ? palette[color].main
        : palette.dark.main;

    // Change this logic to another component and test the % of completed
    const barBackground = multipleColors
      ? completedPercentage === 0 && inProgressPercentage === 0
        ? null
        : inProgressPercentage === 0
        ? `linear-gradient(90deg, rgba(254,200,55,1) -100%, rgba(76,175,80,1) ${completedPercentage}%)`
        : completedPercentage === 0
        ? `linear-gradient(90deg, rgba(76,175,80,1) -100%, rgba(254,200,55,1) ${inProgressPercentage}%)`
        : `linear-gradient(90deg, rgba(76,175,80,1) ${completedPercentage}%, rgba(254,200,55,1) ${inProgressPercentage}%)`
      : backgroundValue;

    return {
      "& .MuiLinearProgress-bar": {
        background: barBackground,
        width: `${value}%`,
        color: text.main,
      },
    };
  }
);

export default GradientLinearProgress;
