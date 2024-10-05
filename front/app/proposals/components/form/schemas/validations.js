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
    subject,
    date,
    openTill,
    tags,
    contact,
    currency,
    discountType,
    allowComments,
    status,
    staffAssigned,
    proposalTo,
    address,
    city,
    state,
    zip,
    phone,
    email,
    country,
    items,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [status.name]: Yup.number().required(status.errorMsg),
    [subject.name]: Yup.string().required(subject.errorMsg),
    [date.name]: Yup.date().required(date.errorMsg),
    [openTill.name]: Yup.date().required(openTill.errorMsg),
    [currency.name]: Yup.number().required(currency.errorMsg),
    [discountType.name]: Yup.number().max(
      MAX_AMOUNT,
      `El valor no puede ser mayor a ${MAX_AMOUNT}`
    ),
    [tags.name]: Yup.array(),
    [allowComments.name]: Yup.boolean(),
  }),
  Yup.object().shape({
    [partner.name]: Yup.number().required(partner.errorMsg),
    [staffAssigned.name]: Yup.number().required(staffAssigned.errorMsg),
    [proposalTo.name]: Yup.string().required(proposalTo.errorMsg),
    [contact.name]: Yup.number().required(contact.errorMsg),
    [country.name]: Yup.number(),
    [address.name]: Yup.string(),
    [state.name]: Yup.string(),
    [city.name]: Yup.string(),
    [zip.name]: Yup.string(),
    [phone.name]: Yup.string(),
  }),
  Yup.object().shape({
    [items.name]: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string(),
          longDescription: Yup.string().nullable(),
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
          discount: Yup.number().nullable(),
        })
      )
      .min(1, "Debe agregar al menos un item"),
  }),
];
export default validations;
