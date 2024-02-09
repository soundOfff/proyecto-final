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
    priority,
    repeat,
    recurring,
    recurringType,
    isInfinite,
    totalCycles,
    taskableType,
    taskableId,
    tags,
    description,
  },
} = checkout;

const initialValues = {
  [description.name]: "",
  [isPublic.name]: false,
  [billable.name]: true,
  [name.name]: "",
  [hourlyRate.name]: 0,
  [startDate.name]: "",
  [dueDate.name]: "",
  [priority.name]: "",
  [repeat.name]: "",
  [recurring.name]: "",
  [recurringType.name]: "",
  [isInfinite.name]: true,
  [totalCycles.name]: "",
  [taskableType.name]: "Caso",
  [taskableId.name]: "",
  [tags.name]: [],
};

export default initialValues;
