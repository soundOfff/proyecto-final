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
    isConsolidator,
    language,
    website,
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

const initialValues = {
  [address.name]: "",
  [city.name]: "",
  [company.name]: "",
  [consolidator.name]: null,
  [country.name]: null,
  [isConsolidator.name]: "",
  [language.name]: "",
  [phone.name]: "",
  [ruc.name]: "",
  [state.name]: "",
  [website.name]: "",
  [zip.name]: "",
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

export default initialValues;