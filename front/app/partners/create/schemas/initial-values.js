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
    juridical: {
      company,
      state,
      country,
      zip,
      phone,
      industry,
      document,
      section,
      address,
      ruc,
      city,
      isConsolidator,
      language,
      website,
      consolidator,
      buildingNumber,
      district,
      email,
      fileNumber,
      imageNumber,
      isResidential,
      jurisdiction,
      province,
      rollNumber,
      dv,
    },

    person: {
      name,
      birthDate,
      expeditionDate,
      isMale,
      number,
      birthPlace,
      nationality,
    },

    invoice: {
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
  },
} = form;

const initialValues = {
  [address.name]: "",
  [city.name]: "",
  [company.name]: "",
  [industry.name]: "",
  [document.name]: "",
  [section.name]: "",
  [consolidator.name]: null,
  [country.name]: null,
  [isConsolidator.name]: 0,
  [language.name]: "",
  [phone.name]: "",
  [ruc.name]: "",
  [state.name]: "",
  [website.name]: "",
  [zip.name]: "",
  [name.name]: "",
  [birthDate.name]: "",
  [expeditionDate.name]: "",
  [isMale.name]: "",
  [number.name]: "",
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
  [buildingNumber.name]: "",
  [district.name]: "",
  [email.name]: "",
  [fileNumber.name]: "",
  [imageNumber.name]: "",
  [isResidential.name]: "",
  [jurisdiction.name]: "",
  [province.name]: "",
  [rollNumber.name]: "",
  [birthPlace.name]: "",
  [nationality.name]: "",
  [dv.name]: "",
};

export default initialValues;
