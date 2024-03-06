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

import * as Yup from "yup";
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
    isInfinite,
    totalCycles,
    taskableType,
    taskableId,
    tags,
    partner_id,
    owner_id,
    description,
  },
} = checkout;

const validations = Yup.object().shape({
  [description.name]: Yup.string(),
  [isPublic.name]: Yup.boolean(),
  [billable.name]: Yup.boolean(),
  [name.name]: Yup.string().required(name.errorMsg),
  [hourlyRate.name]: Yup.number(),
  [startDate.name]: Yup.string().required(startDate.errorMsg),
  [dueDate.name]: Yup.string(),
  [task_priority_id.name]: Yup.string(),
  [task_status_id.name]: Yup.string(),
  [partner_id.name]: Yup.string().required(partner_id.errorMsg),
  [repeat.name]: Yup.string(),
  [recurring.name]: Yup.number().nullable(),
  [recurringType.name]: Yup.string().nullable(),
  [isInfinite.name]: Yup.boolean(),
  [totalCycles.name]: Yup.number().nullable(),
  [taskableType.name]: Yup.string(),
  [owner_id.name]: Yup.number().required(),
  [taskableId.name]: Yup.string().required(taskableId.errorMsg),
  [tags.name]: Yup.array(),
});
export default validations;
