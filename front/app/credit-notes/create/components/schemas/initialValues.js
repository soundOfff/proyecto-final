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

const {
  formField: {
    partner,
    project,
    number,
    date,
    currency,
    reference,
    discountType,
    items,
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
    adjustment,
    unit,
    taxes,
  },
} = checkout;

const initialValues = {
  [partner.name]: "",
  [project.name]: "",
  [number.name]: "",
  [date.name]: "",
  [currency.name]: "",
  [discountType.name]: WITHOUT_DISCOUNT,
  [reference.name]: "",
  [billingStreet.name]: "",
  [billingCity.name]: "",
  [billingState.name]: "",
  [billingZip.name]: "",
  [billingCountry.name]: "",
  [shippingStreet.name]: "",
  [shippingCity.name]: "",
  [shippingState.name]: "",
  [shippingZip.name]: "",
  [shippingCountry.name]: "",
  [adminNote.name]: "",
  [clientNote.name]: "",
  [terms.name]: "",
  [items.name]: [],
  [adjustment.name]: "",
  [unit.name]: "Cantidad",
  [taxes.name]: [],
};

export default initialValues;
