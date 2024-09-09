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

import { LOW_ID } from "/utils/constants/taskPriorityLabels";
import checkout from "./form";
import moment from "moment";

const {
  formField: {
    description,
    isPublic,
    billable,
    name,
    hourlyRate,
    startDate,
    initialDurationMinutes,
    dueDate,
    task_priority_id,
    task_status_id,
    repeat,
    recurring,
    recurringType,
    isInfinite,
    totalCycles,
    taskableType,
    taskableId,
    partner_id,
    tags,
    assigneds,
    dependencies,
    actions,
    requiredFields,
    isFileNeeded,
  },
} = checkout;

const initialValues = {
  [description.name]: "",
  [isPublic.name]: false,
  [billable.name]: true,
  [name.name]: "",
  [initialDurationMinutes.name]: 0,
  [hourlyRate.name]: 0,
  [startDate.name]: moment().format("YYYY-MM-DD"),
  [partner_id.name]: "",
  [dueDate.name]: "",
  [task_priority_id.name]: LOW_ID,
  [task_status_id.name]: "",
  [repeat.name]: "",
  [recurring.name]: "",
  [recurringType.name]: "",
  [isInfinite.name]: true,
  [totalCycles.name]: "",
  [taskableType.name]: "project",
  [assigneds.name]: [],
  [taskableId.name]: "",
  [dependencies.name]: [],
  [actions.name]: [],
  [requiredFields.name]: [],
  [isFileNeeded.name]: false,
};

export default initialValues;
