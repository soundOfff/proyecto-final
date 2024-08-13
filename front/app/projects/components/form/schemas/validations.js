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
import { MAX_AMOUNT } from "/utils/constants/maxInputNumber";

const {
  formField: {
    cost,
    /* estimatedHours, */
    expedient,
    responsiblePersonId,
    description,
    billablePartner,
    type,
    process,
    status,
    serviceType,
    billingType,
    selectedMembers,
    startDate,
    deadline,
    partners,
    proposal,
  },
} = checkout;

const validations = Yup.object().shape({
  /* [estimatedHours.name]: Yup.number("El valor debe ser un número").min(
      1,
      "Debe ser mayor a 0"
    ), */
  [billablePartner.name]: Yup.string().required(billablePartner.errorMsg),
  [cost.name]: Yup.number("El valor debe ser un número")
    .min(1, "Debe ser mayor a 0")
    .max(MAX_AMOUNT, `El valor no puede ser mayor a ${MAX_AMOUNT}`),
  [billingType.name]: Yup.string().required(billingType.errorMsg),
  [type.name]: Yup.string(),
  [process.name]: Yup.number(),
  [status.name]: Yup.string().required(status.errorMsg),
  [expedient.name]: Yup.string().matches(
    /^[0-9]+$/,
    "Solo se permiten números"
  ),
  [startDate.name]: Yup.date().required(startDate.errorMsg),
  [deadline.name]: Yup.date().min(
    Yup.ref(startDate.name),
    "La fecha de entrega debe ser mayor a la fecha de inicio"
  ),
  [serviceType.name]: Yup.string().required(serviceType.errorMsg),
  [responsiblePersonId.name]: Yup.string().required(
    responsiblePersonId.errorMsg
  ),
  [selectedMembers.name]: Yup.array().min(1, selectedMembers.errorMsg),
  [proposal.name]: Yup.number(),
  [description.name]: Yup.string(),
  [partners.name]: Yup.array(),
});

export default validations;
