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
      consolidator,
      isConsolidator,
      dv,
      language,
      website,
      buildingNumber,
      relatedPartners,
      district,
      email,
      fileNumber,
      imageNumber,
      isResidential,
      jurisdiction,
      province,
      rollNumber,
    },

    person: {
      name,
      birthDate,
      expeditionDate,
      isMale,
      number,
      birthPlace,
      isConsolidator: isConsolidatorPerson,
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

const validations = {
  juridical: Yup.object().shape({
    [company.name]: Yup.string().required(company.errorMsg),
    [country.name]: Yup.number().required(country.errorMsg),
    [address.name]: Yup.string().required(address.errorMsg),
    [relatedPartners.name]: Yup.array(),
    [document.name]: Yup.string().nullable(),
    [industry.name]: Yup.string().nullable(),
    [section.name]: Yup.string().nullable(),
    [ruc.name]: Yup.string().required(ruc.errorMsg),
    [dv.name]: Yup.string().required(dv.errorMsg),
    [phone.name]: Yup.string().required(phone.errorMsg),
    [email.name]: Yup.string().email().required(email.errorMsg),
    [jurisdiction.name]: Yup.number().when([country.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(jurisdiction.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
    [district.name]: Yup.number().when([country.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(district.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
    [province.name]: Yup.number().when([country.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(province.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
    [state.name]: Yup.string().nullable(),
    [zip.name]: Yup.string().nullable(),
    [city.name]: Yup.string().nullable(),
    [consolidator.name]: Yup.number().nullable(),
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
    [isConsolidator.name]: Yup.boolean().nullable(),
    [website.name]: Yup.string().nullable(),
    [buildingNumber.name]: Yup.string().nullable(),
    [fileNumber.name]: Yup.string().nullable(),
    [imageNumber.name]: Yup.string().nullable(),
    [isResidential.name]: Yup.boolean().nullable(),
    [rollNumber.name]: Yup.string().nullable(),
  }),
  person: Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [country.name]: Yup.number().required(country.errorMsg),
    [isMale.name]: Yup.boolean().required(isMale.errorMsg),
    [number.name]: Yup.string().required(number.errorMsg),
    [birthPlace.name]: Yup.string().required(birthPlace.errorMsg),
    [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
    [birthDate.name]: Yup.string().nullable(),
    [shippingCity.name]: Yup.string().nullable(),
    [shippingState.name]: Yup.string().nullable(),
    [shippingZip.name]: Yup.string().nullable(),
    [shippingStreet.name]: Yup.string().nullable(),
    [shippingCountry.name]: Yup.number().nullable(),
    [billingCity.name]: Yup.string().nullable(),
    [billingState.name]: Yup.string().nullable(),
    [billingZip.name]: Yup.string().nullable(),
    [isConsolidatorPerson.name]: Yup.boolean().nullable(),
    [billingStreet.name]: Yup.string().nullable(),
    [billingCountry.name]: Yup.number().nullable(),
    [nationality.name]: Yup.number().nullable(),
  }),
};

export default validations;
