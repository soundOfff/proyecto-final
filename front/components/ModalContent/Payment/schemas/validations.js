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
    amount,
    expensesAmount,
    paymentMethodId,
    partnerId,
    date,
    dateRecorded,
    note,
    paymentMode,
    transactionId,
  },
} = checkout;

const validations = Yup.object().shape({
  [amount]: Yup.number().required("El monto es requerido"),
  [expensesAmount]: Yup.number().required(
    "El total de los gastos es requerido"
  ),
  [paymentMethodId]: Yup.string().required("El metodo de pago es requerido"),
  [partnerId]: Yup.string().required("El cliente es requerido"),
  [date]: Yup.date().required("La fecha es requerida"),
  [note]: Yup.string().nullable(),
  [transactionId]: Yup.string().nullable(),
});
export default validations;
