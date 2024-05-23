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
    actions,
  },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [startDate.name]: Yup.date().required(startDate.errorMsg),
  [partner_id.name]: Yup.string().required(partner_id.errorMsg),
  [owner_id.name]: Yup.number().required(),
  [taskableId.name]: Yup.string().required(taskableId.errorMsg),
  [task_priority_id.name]: Yup.string().required(task_priority_id.errorMsg),
  [repeat.name]: Yup.string().required(repeat.errorMsg),

  [description.name]: Yup.string(),
  [isPublic.name]: Yup.boolean(),
  [billable.name]: Yup.boolean(),
  [hourlyRate.name]: Yup.number(),
  [dueDate.name]: Yup.date().min(
    Yup.ref(startDate.name),
    "La fecha desde debe ser anterior a la fecha hasta"
  ),
  [task_status_id.name]: Yup.string(),
  [taskableType.name]: Yup.string(),
  [tags.name]: Yup.array(),
  [recurring.name]: Yup.number().nullable(),
  [recurringType.name]: Yup.string().nullable(),
  [totalCycles.name]: Yup.number().nullable(),
  [isInfinite.name]: Yup.boolean(),
  [actions.name]: Yup.array(),
});
export default validations;
