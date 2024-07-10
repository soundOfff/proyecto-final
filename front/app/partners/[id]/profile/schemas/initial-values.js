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

import detailForm from "./detail-form";
import invoiceForm from "./invoice-form";
import { PANAMA_ID } from "/utils/constants/countries";

const {
  formField: {
    juridical: {
      company,
      state,
      country,
      zip,
      phone,
      address,
      ruc,
      city,
      document,
      industry,
      section,
      relatedPartners,
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
      isConsolidator: isConsolidatorPerson,
      isMale,
      idNumber,
      idType,
      number,
      birthPlace,
      nationality,
    },
  },
} = detailForm;

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

const initialValues = {
  [address.name]: "",
  [city.name]: "",
  [company.name]: "",
  [consolidator.name]: null,
  [country.name]: PANAMA_ID,
  [isConsolidator.name]: "",
  [document.name]: "",
  [industry.name]: "",
  [section.name]: "",
  [idType.name]: "",
  [idNumber.name]: "",
  [language.name]: "",
  [relatedPartners.name]: [],
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
  [isConsolidatorPerson.name]: 0,
  [isResidential.name]: "",
  [jurisdiction.name]: "",
  [province.name]: "",
  [rollNumber.name]: "",
  [birthPlace.name]: "",
  [nationality.name]: "",
  [dv.name]: "",
};

export default initialValues;
