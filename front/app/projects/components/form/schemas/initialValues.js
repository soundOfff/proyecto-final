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

import moment from "moment";
import { NOT_STARTED } from "../../../../../utils/constants/projectStatusesIds";
import checkout from "./form";

const {
  formField: {
    cost,
    /* estimatedHours, */
    expedient,
    description,
    billablePartner,
    status,
    serviceType,
    billingType,
    type,
    process,
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
  [type.name]: "",
  [process.name]: "",
  [expedient.name]: "",
  [description.name]: "",
  [billablePartner.name]: "",
  [status.name]: NOT_STARTED,
  [serviceType.name]: "",
  [billingType.name]: "",
  [selectedMembers.name]: [],
  [startDate.name]: moment().format("YYYY-MM-DD"),
  [deadline.name]: "",
  [partners.name]: [],
  [proposal.name]: "",
};

export default initialValues;
