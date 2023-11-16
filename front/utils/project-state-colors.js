import {
  NOT_STARTED,
  DEVELOPING,
  WAITING,
  CANCELED,
  FINALIZED,
} from "/utils/constants/projectStatusLabels";

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
