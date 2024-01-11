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
  formField: { description, longDescription, rate, tax, tax2, itemGroupId },
} = checkout;

const validations = Yup.object().shape({
  [description.name]: Yup.string().required(description.errorMsg),
  [longDescription.name]: Yup.string(),
  [rate.name]: Yup.number().required(rate.errorMsg),
  [tax.name]: Yup.string(),
  [tax2.name]: Yup.string(),
  [itemGroupId.name]: Yup.string().required(itemGroupId.errorMsg),
});
export default validations;
