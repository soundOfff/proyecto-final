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
    date,
    currency,
    reference,
    discountType,
    billingStreet,
    billingCity,
    billingState,
    billingZip,
    billingCountry,
    shippingStreet,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    adminNote,
    clientNote,
    terms,
    items,
  },
} = checkout;

const validations = [
  Yup.object().shape({
    [number.name]: Yup.number().required(number.errorMsg),
    [date.name]: Yup.date().required(date.errorMsg),
    [partner.name]: Yup.number().required(partner.errorMsg),
    [project.name]: Yup.number().required(project.errorMsg),
    [currency.name]: Yup.number().required(currency.errorMsg),
    [discountType.name]: Yup.string(),
    [reference.name]: Yup.string(),
  }),
  Yup.object().shape({
    [billingStreet.name]: Yup.string(),
    [billingCity.name]: Yup.string(),
    [billingState.name]: Yup.string(),
    [billingZip.name]: Yup.string(),
    [billingCountry.name]: Yup.number(),
    [shippingStreet.name]: Yup.string(),
    [shippingCity.name]: Yup.string(),
    [shippingState.name]: Yup.string(),
    [shippingZip.name]: Yup.string(),
    [shippingCountry.name]: Yup.number(),
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
