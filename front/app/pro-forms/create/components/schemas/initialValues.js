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
    partner,
    project,
    number,
    dateFrom,
    dateTo,
    serviceType,
    retainingAgent,
    subServiceType,
    stopPendingRemainder,
    labels,
    currency,
    state,
    reference,
    agent,
    repeat,
    discountType,
    items,
    note,
  },
} = checkout;

const initialValues = {
  [partner.name]: "",
  [project.name]: "",
  [number.name]: "",
  [dateFrom.name]: "",
  [dateTo.name]: "",
  [serviceType.name]: "",
  [retainingAgent.name]: false,
  [subServiceType.name]: "",
  [stopPendingRemainder.name]: false,
  [labels.name]: "",
  [currency.name]: "USD $",
  [state.name]: "",
  [reference.name]: "",
  [agent.name]: "",
  [repeat.name]: "",
  [discountType.name]: "",
  [note.name]: "",
  [items.name]: [],
};

export default initialValues;
