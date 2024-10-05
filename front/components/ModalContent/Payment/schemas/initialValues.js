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

const initialValues = {
  [paymentMethodId.name]: "",
  [partnerId.name]: "",
  [amount.name]: "",
  [expensesAmount.name]: "",
  [date.name]: "",
  [note.name]: "",
  [transactionId.name]: "",
};

export default initialValues;
