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
  formField: { name, description, fields, model, json },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string(),
  [description.name]: Yup.string().nullable(),
  [model.name]: Yup.string(),
  [fields.name]: Yup.string(),
  [json.name]: Yup.string(),
});

export default validations;
