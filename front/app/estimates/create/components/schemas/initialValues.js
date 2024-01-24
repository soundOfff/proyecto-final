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
import checkout from "./form";
import { WITHOUT_DISCOUNT } from "/utils/constants/discountTypes";
import { NO_SENT } from "/utils/constants/estimateStatus";

const {
  formField: {
    partner,
    project,
    number,
    dateFrom,
    dateTo,
    serviceType,
    retainingAgent,
    subServiceType,
    stopPendingRemainder,
    tags,
    currency,
    state,
    reference,
    agent,
    repeat,
    discountType,
    items,
    adminNote,
    clientNote,
    terms,
    adjustment,
    unit,
    taxes,
  },
} = checkout;

const initialValues = {
  [partner.name]: "",
  [project.name]: "",
  [number.name]: "",
  [dateFrom.name]: moment().format("YYYY/MM/DD"),
  [dateTo.name]: moment().add(1, "week").format("YYYY/MM/DD"),
  [serviceType.name]: "",
  [retainingAgent.name]: false,
  [subServiceType.name]: "",
  [stopPendingRemainder.name]: false,
  [tags.name]: [],
  [currency.name]: "",
  [state.name]: NO_SENT,
  [discountType.name]: WITHOUT_DISCOUNT,
  [reference.name]: "",
  [agent.name]: "",
  [repeat.name]: "",
  [adminNote.name]: "",
  [clientNote.name]: "",
  [terms.name]: "",
  [items.name]: [],
  [adjustment.name]: "",
  [unit.name]: "Cantidad",
  [taxes.name]: [],
};

export default initialValues;
