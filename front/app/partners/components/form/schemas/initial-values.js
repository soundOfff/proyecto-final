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
import { PANAMA_ID } from "/utils/constants/countries";

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
      district,
      email,
      fileNumber,
      relatedPartners,
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
      idNumber,
      occupation,
      idType,
      civilStatus,
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
  [country.name]: PANAMA_ID,
  [isConsolidator.name]: 0,
  [language.name]: "",
  [phone.name]: "",
  [occupation.name]: "",
  [ruc.name]: "",
  [relatedPartners.name]: [],
  [state.name]: "",
  [website.name]: "",
  [zip.name]: "",
  [name.name]: "",
  [birthDate.name]: "",
  [expeditionDate.name]: "",
  [idNumber.name]: "",
  [idType.name]: "",
  [civilStatus.name]: "",
  [isMale.name]: 0,
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
  [district.name]: "",
  [email.name]: "",
  [fileNumber.name]: "",
  [imageNumber.name]: "",
  [isResidential.name]: 0,
  [jurisdiction.name]: "",
  [province.name]: "",
  [rollNumber.name]: "",
  [birthPlace.name]: PANAMA_ID,
  [nationality.name]: PANAMA_ID,
  [dv.name]: "",
};

export default initialValues;
