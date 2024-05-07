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
    cost,
    estimatedHours,
    expedient,
    responsiblePersonId,
    description,
    defendant,
    plaintiff,
    status,
    serviceType,
    billingType,
    selectedMembers,
    startDate,
    deadline,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [estimatedHours.name]: Yup.number("El valor debe ser un número").min(
      1,
      "Debe ser mayor a 0"
    ),
    [cost.name]: Yup.number("El valor debe ser un número").min(
      1,
      "Debe ser mayor a 0"
    ),
    [expedient.name]: Yup.string().matches(
      /^[0-9]+$/,
      "Solo se permiten números"
    ),
    [description.name]: Yup.string(),
  }),
  Yup.object().shape({
    [defendant.name]: Yup.string().required(defendant.errorMsg),
    [plaintiff.name]: Yup.string(),
    [responsiblePersonId.name]: Yup.string().required(
      responsiblePersonId.errorMsg
    ),
    [status.name]: Yup.string().required(status.errorMsg),
    [serviceType.name]: Yup.string().required(serviceType.errorMsg),
    [billingType.name]: Yup.string().required(billingType.errorMsg),
    [selectedMembers.name]: Yup.array().min(1, selectedMembers.errorMsg),
    [startDate.name]: Yup.date().required(startDate.errorMsg),
    [deadline.name]: Yup.date().min(
      Yup.ref(startDate.name),
      "La fecha de entrega debe ser mayor a la fecha de inicio"
    ),
  }),
];

export default validations;
