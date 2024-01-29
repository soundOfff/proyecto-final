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
import invoiceForm from "./invoice-form";

const {
  formField: {
    shippingCity,
    shippingCountry,
    shippingState,
    shippingZip,
    shippingStreet,
    billingCity,
    billingCountry,
    billingState,
    billingZip,
    billingStreet,
  },
} = invoiceForm;

const invoiceValidations = Yup.object().shape({
  [shippingCity.name]: Yup.string().nullable(),
  [shippingState.name]: Yup.string().nullable(),
  [shippingZip.name]: Yup.string().nullable(),
  [shippingStreet.name]: Yup.string().nullable(),
  [shippingCountry.name]: Yup.object().nullable(),
  [billingCity.name]: Yup.string().nullable(),
  [billingState.name]: Yup.string().nullable(),
  [billingZip.name]: Yup.string().nullable(),
  [billingStreet.name]: Yup.string().nullable(),
  [billingCountry.name]: Yup.object().nullable(),
});

export default invoiceValidations;
