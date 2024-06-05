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
import detailForm from "./detail-form";
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
      consolidator,
      isConsolidator,
      document,
      industry,
      section,
      language,
      website,
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
      isConsolidator: isConsolidatorPerson,
      birthPlace,
      nationality,
    },
  },
} = detailForm;

const detailValidations = {
  juridical: Yup.object().shape({
    [company.name]: Yup.string().required(company.errorMsg),
    [state.name]: Yup.string().nullable(),
    [country.name]: Yup.number().required(country.errorMsg),
    [zip.name]: Yup.string().nullable(),
    [address.name]: Yup.string().required(address.errorMsg),
    [ruc.name]: Yup.string().required(ruc.errorMsg),
    [dv.name]: Yup.string().required(dv.errorMsg),
    [city.name]: Yup.string().nullable(),
    [phone.name]: Yup.string().required(phone.errorMsg),
    [consolidator.name]: Yup.number().nullable(),
    [isConsolidator.name]: Yup.boolean().nullable(),
    [website.name]: Yup.string().nullable(),
    [buildingNumber.name]: Yup.string().nullable(),
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
    [email.name]: Yup.string().email().required(email.errorMsg),
    [fileNumber.name]: Yup.string().nullable(),
    [imageNumber.name]: Yup.string().nullable(),
    [industry.name]: Yup.string().nullable(),
    [section.name]: Yup.string().nullable(),
    [language.name]: Yup.string().nullable(),
    [document.name]: Yup.string().nullable(),
    [isResidential.name]: Yup.boolean().nullable(),
    [rollNumber.name]: Yup.string().nullable(),
  }),
  person: Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [country.name]: Yup.number().required(country.errorMsg),
    [birthDate.name]: Yup.string().nullable(),
    [expeditionDate.name]: Yup.date().nullable(),
    [isConsolidatorPerson.name]: Yup.boolean().nullable(),
    [isMale.name]: Yup.boolean().required(),
    [number.name]: Yup.string().required(),
    [birthPlace.name]: Yup.string().required(),
    [nationality.name]: Yup.number().nullable(),
  }),
};

export default detailValidations;
