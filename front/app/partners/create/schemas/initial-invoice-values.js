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
import checkout from "./invoice-form";

const {
  formField: {
    billingCity,
    billingCountry,
    billingState,
    billingStreet,
    billingZip,
    shippingCity,
    shippingCountry,
    shippingState,
    shippingStreet,
    shippingZip,
  },
} = checkout;

const InitialInvoiceValues = {
  [billingCity.name]: "",
  [billingCountry.name]: "",
  [billingState.name]: "",
  [billingStreet.name]: "",
  [billingZip.name]: "",
  [shippingCity.name]: "",
  [shippingCountry.name]: "",
  [shippingState.name]: "",
  [shippingStreet.name]: "",
  [shippingZip.name]: "",
};

export default InitialInvoiceValues;
