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

import { NOT_STARTED } from "../../../../../utils/constants/projectStatusesIds";
import checkout from "./form";

const {
  formField: {
    cost,
    /* estimatedHours, */
    expedient,
    description,
    defendant,
    plaintiff,
    status,
    serviceType,
    billingType,
    selectedMembers,
    startDate,
    deadline,
    partners,
    proposal,
  },
} = checkout;

const initialValues = {
  [cost.name]: "",
  /* [estimatedHours.name]: "", */
  [expedient.name]: "",
  [description.name]: "",
  [defendant.name]: "",
  [plaintiff.name]: "",
  [status.name]: NOT_STARTED,
  [serviceType.name]: "",
  [billingType.name]: "",
  [selectedMembers.name]: [],
  [startDate.name]: "",
  [deadline.name]: "",
  [partners.name]: [],
  [proposal.name]: "",
};

export default initialValues;
