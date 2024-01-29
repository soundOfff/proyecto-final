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

import checkout from "./detail-form";

const {
  formField: {
    address,
    city,
    company,
    consolidator,
    country,
    isConsolidator,
    language,
    phone,
    ruc,
    state,
    website,
    zip,
  },
} = checkout;

const InitialDetailValues = {
  [address.name]: "",
  [city.name]: "",
  [company.name]: null,
  [consolidator.name]: "",
  [country.name]: null,
  [isConsolidator.name]: "",
  [language.name]: "",
  [phone.name]: "",
  [ruc.name]: "",
  [state.name]: "",
  [website.name]: "",
  [zip.name]: "",
};

export default InitialDetailValues;
