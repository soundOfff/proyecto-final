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
import { MAX_AMOUNT } from "../../../../../utils/constants/maxInputNumber";

const {
  formField: { description, longDescription, rate, tax, tax2, itemGroupId },
} = checkout;

const validations = Yup.object().shape({
  [description.name]: Yup.string().required(description.errorMsg),
  [rate.name]: Yup.number()
    .max(MAX_AMOUNT, `El valor no puede ser mayor a ${MAX_AMOUNT}`)
    .required(rate.errorMsg),
  [longDescription.name]: Yup.string().nullable(),
  [tax.name]: Yup.string().nullable(),
  [tax2.name]: Yup.string().nullable(),
  [itemGroupId.name]: Yup.string().nullable(),
});
export default validations;
