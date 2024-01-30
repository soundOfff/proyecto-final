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
import form from "./form";

const {
  formField: {
    company,
    state,
    country,
    zip,
    phone,
    address,
    ruc,
    city,
    consolidator,
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
} = form;

const validations = Yup.object().shape({
  [company.name]: Yup.string().required(company.errorMsg),
  [state.name]: Yup.string().nullable(),
  [country.name]: Yup.number().required(country.errorMsg),
  [zip.name]: Yup.string().nullable(),
  [address.name]: Yup.string().nullable(),
  [ruc.name]: Yup.string().nullable(),
  [city.name]: Yup.string().nullable(),
  [phone.name]: Yup.string().nullable(),
  [consolidator.name]: Yup.number().required(consolidator.errorMsg),
  [shippingCity.name]: Yup.string().nullable(),
  [shippingState.name]: Yup.string().nullable(),
  [shippingZip.name]: Yup.string().nullable(),
  [shippingStreet.name]: Yup.string().nullable(),
  [shippingCountry.name]: Yup.number().nullable(),
  [billingCity.name]: Yup.string().nullable(),
  [billingState.name]: Yup.string().nullable(),
  [billingZip.name]: Yup.string().nullable(),
  [billingStreet.name]: Yup.string().nullable(),
  [billingCountry.name]: Yup.number().nullable(),
});

export default validations;
