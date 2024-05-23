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

import checkout from "./form";

const {
  formField: {
    isPublic,
    billable,
    name,
    hourlyRate,
    startDate,
    dueDate,
    task_priority_id,
    task_status_id,
    repeat,
    recurring,
    recurringType,
    owner_id,
    isInfinite,
    totalCycles,
    taskableType,
    taskableId,
    partner_id,
    tags,
    description,
    actions,
  },
} = checkout;

const initialValues = {
  [description.name]: "",
  [isPublic.name]: false,
  [billable.name]: true,
  [name.name]: "",
  [hourlyRate.name]: 0,
  [startDate.name]: "",
  [partner_id.name]: "",
  [dueDate.name]: "",
  [task_priority_id.name]: "",
  [task_status_id.name]: "",
  [repeat.name]: "",
  [recurring.name]: "",
  [recurringType.name]: "",
  [isInfinite.name]: true,
  [totalCycles.name]: "",
  [taskableType.name]: "project",
  [owner_id.name]: "",
  [taskableId.name]: "",
  [tags.name]: [],
  [actions.name]: [],
};

export default initialValues;
