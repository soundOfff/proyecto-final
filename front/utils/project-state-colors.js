import {
  NOT_STARTED,
  DEVELOPING,
  WAITING,
  CANCELED,
  FINALIZED,
} from "/utils/constants/projectStatusLabels";

const COLORS = ["info", "primary", "warning", "error", "success", "dark"];

const LEVELS = [
  "#D9D9D9",
  "#A6A6A6",
  "#737373",
  "#595959",
  "#404040",
  "#1A1A1A",
];

export function setColor(label) {
  if (label === NOT_STARTED) {
    return "primary";
  } else if (label === DEVELOPING) {
    return "info";
  } else if (label === WAITING) {
    return "warning";
  } else if (label === CANCELED) {
    return "error";
  } else if (label === FINALIZED) {
    return "success";
  } else {
    return "dark";
  }
}

// TODO: make cyclic array of colors sending an id.
export function getColor(id = 0) {
  return COLORS[id % COLORS.length];
}
