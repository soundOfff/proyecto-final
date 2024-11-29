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
  formField: { description, name, projectServiceType, staffs },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [description.name]: Yup.string(),
  [projectServiceType.name]: Yup.number().required(projectServiceType.errorMsg),
  [staffs.name]: Yup.array(),
});

export default validations;
