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
    note,
    transactionId,
  },
} = checkout;

const validations = Yup.object().shape({
  [amount.name]: Yup.number().required(amount.errorMsg),
  [expensesAmount.name]: Yup.number().required(expensesAmount.errorMsg),
  [paymentMethodId.name]: Yup.string().required(paymentMethodId.errorMsg),
  [partnerId.name]: Yup.string().required(partnerId.errorMsg),
  [date.name]: Yup.date().required(date.errorMsg),
  [note.name]: Yup.string().nullable(),
  [transactionId.name]: Yup.string().nullable(),
});
export default validations;
