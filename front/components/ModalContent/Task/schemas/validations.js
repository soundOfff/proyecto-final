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

const validations = Yup.object().shape({
  [description.name]: Yup.string(),
  [isPublic.name]: Yup.boolean(),
  [billable.name]: Yup.boolean(),
  [name.name]: Yup.string().required(name.errorMsg),
  [hourlyRate.name]: Yup.number(),
  [startDate.name]: Yup.string().required(startDate.errorMsg),
  [dueDate.name]: Yup.string(),
  [priority.name]: Yup.string(),
  [repeat.name]: Yup.string(),
  [recurring.name]: Yup.number(),
  [recurringType.name]: Yup.string(),
  [isInfinite.name]: Yup.boolean(),
  [totalCycles.name]: Yup.number(),
  [taskableType.name]: Yup.string(),
  [taskableId.name]: Yup.string().required(taskableId.errorMsg),
  [tags.name]: Yup.array(),
});
export default validations;
