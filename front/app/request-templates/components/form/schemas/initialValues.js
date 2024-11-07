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
  formField: { name, description, fields, json, rows },
} = checkout;

const initialValues = {
  [name.name]: "",
  [description.name]: "",
  [fields.name]: "",
  [json.name]: "",
  [rows.name]: [],
};

export default initialValues;
