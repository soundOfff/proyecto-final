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
    subject,
    date,
    openTill,
    tags,
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
    [subject.name]: Yup.string().required(subject.errorMsg),
    [partner.name]: Yup.number().required(partner.errorMsg),
    [date.name]: Yup.date().required(date.errorMsg),
    [openTill.name]: Yup.date().required(openTill.errorMsg),
    [currency.name]: Yup.number().required(currency.errorMsg),
    [discountType.name]: Yup.number(),
    [tags.name]: Yup.array(),
    [allowComments.name]: Yup.boolean(),
  }),
  Yup.object().shape({
    [status.name]: Yup.number().required(status.errorMsg),
    [staffAssigned.name]: Yup.number().required(staffAssigned.errorMsg),
    [proposalTo.name]: Yup.string().required(proposalTo.errorMsg),
    [country.name]: Yup.number(),
    [address.name]: Yup.string(),
    [state.name]: Yup.string(),
    [city.name]: Yup.string(),
    [zip.name]: Yup.string(),
    [email.name]: Yup.string().email().required(email.errorMsg),
    [phone.name]: Yup.string(),
  }),
  Yup.object().shape({
    [items.name]: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string(),
          longDescription: Yup.string(),
          type: Yup.number(),
          quantity: Yup.number(),
          rate: Yup.number(),
          taxes: Yup.array().of(
            Yup.object().shape({
              name: Yup.string(),
              rate: Yup.number(),
            })
          ),
          discount: Yup.number(),
        })
      )
      .min(1, "Debe agregar al menos un item"),
  }),
];
export default validations;
