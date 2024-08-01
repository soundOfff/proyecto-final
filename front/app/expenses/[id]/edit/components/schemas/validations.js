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
    amount,
    category,
    note,
    date,
    name,
    task,
    currency,
    partner,
    project,
    reference,
    paymentMethod,
    tax,
    tax2,
    repeat,
    recurring,
    recurringType,
    totalCycles,
    isInfinite,
    files,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [name.name]: Yup.string(),
    [note.name]: Yup.string(),
    [task.name]: Yup.string().nullable(),
    [category.name]: Yup.string().required(category.errorMsg),
    [date.name]: Yup.date().required(date.errorMsg),
    [amount.name]: Yup.number("El valor debe ser un número")
      .required(amount.errorMsg)
      .min(1, "Debe ser mayor a 0"),
    [partner.name]: Yup.string().required(partner.errorMsg),
    [project.name]: Yup.string().nullable(),
  }),
  Yup.object().shape({
    [currency.name]: Yup.string().required(currency.errorMsg),
    [tax.name]: Yup.string().nullable(),
    [tax2.name]: Yup.string().nullable(),
    [paymentMethod.name]: Yup.string().nullable(),
    [reference.name]: Yup.string(),
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
        schema.required(
          "Este campo es requerido si se selecciono Personalizado"
        ),
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
    [files.name]: Yup.array().nullable(),
  }),
];

export default validations;
