import {
  IN_PROGRESS_ID,
  PENDING_ID,
  DONE_STATUS_ID,
} from "./constants/taskStatuses";
import {
  NOT_STARTED,
  DEVELOPING,
  WAITING,
  CANCELED,
  FINALIZED,
} from "/utils/constants/projectStatusLabels";

import {
  LOW_PRIORITY,
  MEDIUM_PROPRITY,
  HIGH_PRIORITY,
  URGENT_PRIORITY,
} from "/utils/constants/taskPriorityLabels";

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

export function getColor(id = 0) {
  return COLORS[id % COLORS.length];
}

export function getPriorityColor(label) {
  if (label === LOW_PRIORITY) {
    return "success";
  } else if (label === MEDIUM_PROPRITY) {
    return "info";
  } else if (label === HIGH_PRIORITY) {
    return "primary";
  } else if (label === URGENT_PRIORITY) {
    return "error";
  } else {
    return "dark";
  }
}

export function getStatusColor(label) {
  if (label === DONE_STATUS_ID) {
    return "success";
  } else if (label === IN_PROGRESS_ID) {
    return "warning";
  } else if (label === PENDING_ID) {
    return "error";
  } else {
    return "dark";
  }
}
