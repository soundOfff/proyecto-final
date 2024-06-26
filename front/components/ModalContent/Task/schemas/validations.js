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
import { CUSTOM } from "/utils/constants/repeats";

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
    dependencies,
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
    requiredFields,
    isFileNeeded,
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
  [dependencies.name]: Yup.array(),
  [description.name]: Yup.string(),
  [isPublic.name]: Yup.boolean(),
  [billable.name]: Yup.boolean(),
  [hourlyRate.name]: Yup.number().required(hourlyRate.errorMsg),
  [dueDate.name]: Yup.date().min(
    Yup.ref(startDate.name),
    "La fecha desde debe ser anterior a la fecha hasta"
  ),
  [task_status_id.name]: Yup.string(),
  [taskableType.name]: Yup.string(),
  [tags.name]: Yup.array(),
  [repeat.name]: Yup.number(),
  [recurring.name]: Yup.number().when(repeat.name, {
    is: CUSTOM,
    then: (schema) =>
      schema
        .min(1, "Debe ser mayor a 0")
        .required("Este campo es requerido si se selecciono Personalizado"),
    otherwise: (schema) => schema.nullable(),
  }),
  [recurringType.name]: Yup.number().when(repeat.name, {
    is: CUSTOM,
    then: (schema) =>
      schema.required("Este campo es requerido si se selecciono Personalizado"),
    otherwise: (schema) => schema.nullable(),
  }),
  [isInfinite.name]: Yup.boolean().when(repeat.name, {
    is: true,
    then: Yup.boolean().required("Este campo es requerido"),
  }),
  [totalCycles.name]: Yup.number().when([repeat.name, isInfinite.name], {
    is: (repeat_id, is_infinite) => repeat_id && !is_infinite,
    then: (schema) =>
      schema
        .min(1, "Los ciclos totales deben ser mayor a 0")
        .required('Este campo es requerido si seleccionó "repetir cada"'),
  }),
  [actions.name]: Yup.array(),
  [requiredFields.name]: Yup.array(),
  [isFileNeeded.name]: Yup.boolean(),
});
export default validations;
