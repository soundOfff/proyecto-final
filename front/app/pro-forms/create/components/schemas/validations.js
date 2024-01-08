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
  formField: {
    partner,
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
    note,
  },
} = checkout;

// TODO: check validations
const validations = [
  Yup.object().shape({
    [partner.name]: Yup.string().required(partner.errorMsg),
    [number.name]: Yup.string().required(number.errorMsg),
    [dateFrom.name]: Yup.date().required(dateFrom.errorMsg),
    [dateTo.name]: Yup.date().required(dateTo.errorMsg),
    [serviceType.name]: Yup.string().required(serviceType.errorMsg),
    [retainingAgent.name]: Yup.string().required(retainingAgent.errorMsg),
    [subServiceType.name]: Yup.string().required(subServiceType.errorMsg),
    [stopPendingRemainder.name]: Yup.boolean(),
    [labels.name]: Yup.string(),
    [currency.name]: Yup.string().required(currency.errorMsg),
    [state.name]: Yup.string().required(state.errorMsg),
    [reference.name]: Yup.string(),
    [agent.name]: Yup.string().required(agent.errorMsg),
    [repeat.name]: Yup.string(),
    [discountType.name]: Yup.string(),
    [note.name]: Yup.string(),
  }),
];
export default validations;
