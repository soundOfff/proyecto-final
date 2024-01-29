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
    category,
    date,
    note,
    name,
    billable,
    currency,
    partner,
    reference,
    tax,
    tax2,
    project,
  },
} = checkout;

const initialValues = {
  [amount.name]: "",
  [category.name]: "",
  [note.name]: "",
  [date.name]: "",
  [name.name]: "",
  [currency.name]: 1,
  [partner.name]: "",
  [reference.name]: "",
  [tax.name]: "",
  [tax2.name]: "",
  [billable.name]: false,
  [project.name]: "",
};

export default initialValues;
