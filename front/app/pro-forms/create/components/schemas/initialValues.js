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
  [state.name]: "",
  [reference.name]: "",
  [agent.name]: "",
  [repeat.name]: "",
  [discountType.name]: "",
  [adminNote.name]: "",
  [clientNote.name]: "",
  [terms.name]: "",
  [items.name]: [],
  [adjustment.name]: "",
  [unit.name]: "Cantidad",
};

export default initialValues;
