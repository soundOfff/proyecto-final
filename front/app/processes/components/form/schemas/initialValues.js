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
    description,
    name,
    stepQuantity,
    projectServiceType,
    forks,
    staffs,
  },
} = checkout;

const initialValues = {
  [description.name]: "",
  [name.name]: "",
  [stepQuantity.name]: "",
  [projectServiceType.name]: "",
  [forks.name]: [],
  [staffs.name]: [],
};

export default initialValues;
