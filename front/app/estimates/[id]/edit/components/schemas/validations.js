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
    project,
    number,
    dateFrom,
    dateTo,
    serviceType,
    hasRetainingAgent,
    subServiceType,
    isExpiryNotified,
    tags,
    currency,
    reference,
    status,
    agent,
    recurring,
    discountType,
    adminNote,
    clientNote,
    terms,
    items,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [number.name]: Yup.string().required(number.errorMsg),
    [partner.name]: Yup.number().required(partner.errorMsg),
    [project.name]: Yup.number().required(project.errorMsg),
    [dateFrom.name]: Yup.date().required(dateFrom.errorMsg),
    [dateTo.name]: Yup.date().required(dateTo.errorMsg),
    [serviceType.name]: Yup.string().nullable(),
    [subServiceType.name]: Yup.string().nullable(),
    [hasRetainingAgent.name]: Yup.boolean().nullable(),
    [tags.name]: Yup.array(),
    [currency.name]: Yup.number().required(currency.errorMsg),
  }),
  Yup.object().shape({
    [isExpiryNotified.name]: Yup.boolean(),
    [reference.name]: Yup.string().nullable(),
    [status.name]: Yup.number().required(status.errorMsg),
    [agent.name]: Yup.number().required(agent.errorMsg),
    [recurring.name]: Yup.string().nullable(),
    [discountType.name]: Yup.string().nullable(),
    [adminNote.name]: Yup.string().nullable(),
    [clientNote.name]: Yup.string().nullable(),
    [terms.name]: Yup.string().nullable(),
  }),
  Yup.object().shape({
    [items.name]: Yup.array().min(1, "Debe agregar al menos un item"),
  }),
];
export default validations;
