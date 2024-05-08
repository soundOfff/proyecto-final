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

import { ADMINISTRATIVE } from "/utils/constants/projectServiceTypes";
import checkout from "./form";

const {
  formField: {
    cost,
    estimatedHours,
    expedient,
    description,
    defendant,
    plaintiff,
    status,
    serviceType,
    billingType,
    selectedMembers,
    responsiblePersonId,
    startDate,
    deadline,
  },
} = checkout;

const initialValues = {
  [cost.name]: "",
  [estimatedHours.name]: "",
  [expedient.name]: "",
  [description.name]: "",
  [defendant.name]: "",
  [plaintiff.name]: "",
  [status.name]: "",
  [responsiblePersonId.name]: "",
  [serviceType.name]: ADMINISTRATIVE,
  [billingType.name]: "",
  [selectedMembers.name]: "",
  [startDate.name]: "",
  [deadline.name]: "",
};

export default initialValues;
