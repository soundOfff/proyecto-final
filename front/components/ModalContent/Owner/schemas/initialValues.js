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

import { LOW_ID } from "/utils/constants/taskPriorityLabels";
import checkout from "./form";
import moment from "moment";

const {
  formField: {
    relatedPartnerId,
    partnerTypeId,
    startDate,
    endDate,
    active,
    seat,
    deed,
    checkIn,
    deedDate,
    legalCircuit,
    notary,
    sheet,
  },
} = checkout;

const initialValues = {
  [relatedPartnerId.name]: "",
  [partnerTypeId.name]: "",
  [startDate.name]: moment().format("YYYY-MM-DD"),
  [endDate.name]: "",
  [active.name]: true,
  [seat.name]: "",
  [deed.name]: "",
  [checkIn.name]: moment().format("YYYY-MM-DD"),
  [deedDate.name]: moment().format("YYYY-MM-DD"),
  [legalCircuit.name]: "",
  [notary.name]: "",
  [sheet.name]: "",
};

export default initialValues;
