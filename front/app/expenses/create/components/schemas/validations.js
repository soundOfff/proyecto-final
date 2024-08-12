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
import { MAX_AMOUNT } from "/utils/constants/maxInputNumber";

const {
  formField: {
    amount,
    category,
    note,
    date,
    name,
    currency,
    partner,
    task,
    project,
    files,
    reference,
    paymentMethod,
    tax,
    tax2,
    repeat,
    recurring,
    totalCycles,
    isInfinite,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string(),
    [note.name]: Yup.string(),
    [partner.name]: Yup.string().required(partner.errorMsg),
    [task.name]: Yup.string().nullable(),
    [project.name]: Yup.string().nullable(),
    [category.name]: Yup.string().required(category.errorMsg),
    [date.name]: Yup.date().required(date.errorMsg),
    [amount.name]: Yup.number("El valor debe ser un número")
      .required(amount.errorMsg)
      .min(1, "Debe ser mayor a 0")
      .max(MAX_AMOUNT, `El valor no puede ser mayor a ${MAX_AMOUNT}`),
  }),
  Yup.object().shape({
    [currency.name]: Yup.string().required(currency.errorMsg),
    [tax.name]: Yup.string(),
    [tax2.name]: Yup.string(),
    [paymentMethod.name]: Yup.string(),
    [reference.name]: Yup.string(),
    [repeat.name]: Yup.string(),
    [recurring.name]: Yup.number().when(repeat.name, {
      is: (value) => value !== CUSTOM,
      then: (schema) =>
        schema.min(1, "Debe ser mayor a 0").required("Este campo es requerido"),
    }),
    [isInfinite.name]: Yup.boolean(),
    [totalCycles.name]: Yup.number().when(isInfinite.name, {
      is: false,
      then: (schema) =>
        schema
          .min(1, "Los ciclos totales deben ser mayor a 0")
          .max(MAX_AMOUNT, `El valor no puede ser mayor a ${MAX_AMOUNT}`),
    }),
    [files.name]: Yup.array().nullable(),
  }),
];

export default validations;
