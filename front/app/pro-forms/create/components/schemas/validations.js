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
    [serviceType.name]: Yup.string().required(serviceType.errorMsg),
    [retainingAgent.name]: Yup.boolean(),
    [subServiceType.name]: Yup.string().required(subServiceType.errorMsg),
    [stopPendingRemainder.name]: Yup.boolean(),
    [tags.name]: Yup.array(),
    [currency.name]: Yup.string().required(currency.errorMsg),
    [reference.name]: Yup.string(),
    [repeat.name]: Yup.string(),
    [discountType.name]: Yup.string(),
  }),
  Yup.object().shape({
    [stopPendingRemainder.name]: Yup.boolean(),
    [reference.name]: Yup.string(),
    [agent.name]: Yup.string().required(agent.errorMsg),
    [repeat.name]: Yup.string(),
    [discountType.name]: Yup.string(),
    [adminNote.name]: Yup.string(),
    [clientNote.name]: Yup.string(),
    [terms.name]: Yup.string(),
  }),
  Yup.object().shape({
    [items.name]: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string(),
          longDescription: Yup.string(),
          type: Yup.string(),
          quantity: Yup.number(),
          rate: Yup.number(),
          taxes: Yup.array().of(
            Yup.object().shape({
              name: Yup.string(),
              taxRate: Yup.number(),
            })
          ),
          discount: Yup.number(),
        })
      )
      .min(1, "Debe agregar al menos un item"),
  }),
];
export default validations;
