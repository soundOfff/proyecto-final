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
    name,
    cost,
    estimatedHours,
    expedient,
    description,
    partner,
    status,
    serviceType,
    billingType,
    selectedMembers,
    startDate,
    deadline,
  },
} = checkout;

const initialValues = {
  [name.name]: "",
  [cost.name]: "",
  [estimatedHours.name]: "",
  [expedient.name]: "",
  [description.name]: "",
  [partner.name]: "",
  [status.name]: "",
  [serviceType.name]: "",
  [billingType.name]: "",
  [selectedMembers.name]: [],
  [startDate.name]: "",
  [deadline.name]: "",
};

export default initialValues;
