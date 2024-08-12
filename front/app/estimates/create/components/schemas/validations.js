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
import { MAX_AMOUNT } from "/utils/constants/maxInputNumber";

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
    stopPendingRemainder,
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
    expenses,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [number.name]: Yup.string().required(number.errorMsg),
    [partner.name]: Yup.number().required(partner.errorMsg),
    [project.name]: Yup.number().required(project.errorMsg),
    [dateFrom.name]: Yup.date().required(dateFrom.errorMsg),
    [dateTo.name]: Yup.date().required(dateTo.errorMsg),
    [serviceType.name]: Yup.string(),
    [hasRetainingAgent.name]: Yup.boolean(),
    [subServiceType.name]: Yup.string(),
    [stopPendingRemainder.name]: Yup.boolean(),
    [tags.name]: Yup.array(),
    [currency.name]: Yup.number().required(currency.errorMsg),
    [reference.name]: Yup.string(),
    [discountType.name]: Yup.string(),
  }),
  Yup.object().shape({
    [stopPendingRemainder.name]: Yup.boolean(),
    [reference.name]: Yup.string(),
    [status.name]: Yup.number().required(status.errorMsg),
    [agent.name]: Yup.number().required(agent.errorMsg),
    [recurring.name]: Yup.string(),
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
          type: Yup.number(),
          quantity: Yup.number().max(
            MAX_AMOUNT,
            `El valor no puede ser mayor a ${MAX_AMOUNT}`
          ),
          rate: Yup.number(),
          taxes: Yup.array().of(
            Yup.object().shape({
              name: Yup.string(),
              rate: Yup.number().max(
                MAX_AMOUNT,
                `El valor no puede ser mayor a ${MAX_AMOUNT}`
              ),
            })
          ),
          discount: Yup.number().max(
            MAX_AMOUNT,
            `El valor no puede ser mayor a ${MAX_AMOUNT}`
          ),
        })
      )
      .min(1, "Debe agregar al menos un item"),
    [expenses.name]: Yup.array(),
  }),
];
export default validations;
