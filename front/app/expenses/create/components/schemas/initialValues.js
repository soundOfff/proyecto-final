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

import moment from "moment/moment";
import checkout from "./form";

const {
  formField: {
    amount,
    category,
    date,
    note,
    name,
    billable,
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
    files,
    isInfinite,
    createInvoiceBillable,
    sendInvoiceToCustomer,
  },
} = checkout;

const initialValues = {
  [amount.name]: "",
  [category.name]: "",
  [partner.name]: "",
  [project.name]: "",
  [note.name]: "",
  [date.name]: moment().format("YYYY-MM-DD"),
  [name.name]: "",
  [currency.name]: "",
  [paymentMethod.name]: "",
  [reference.name]: "",
  [tax.name]: "",
  [tax2.name]: "",
  [repeat.name]: "",
  [recurring.name]: 1,
  [recurringType.name]: 1,
  [files.name]: [],
  [totalCycles.name]: "",
  [isInfinite.name]: true,
  [createInvoiceBillable.name]: false,
  [sendInvoiceToCustomer.name]: false,
  [billable.name]: true,
};

export default initialValues;
