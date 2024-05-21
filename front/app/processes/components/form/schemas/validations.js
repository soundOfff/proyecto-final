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
    department,
    description,
    name,
    stepQuantity,
    projectServiceType,
  },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [stepQuantity.name]: Yup.number().required(stepQuantity.errorMsg),
  [department.name]: Yup.string(),
  [description.name]: Yup.string(),
  [projectServiceType.name]: Yup.number().required(projectServiceType.errorMsg),
});

export default validations;