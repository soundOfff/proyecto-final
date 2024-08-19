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
      document,
      industry,
      section,
      consolidator,
      isConsolidator,
      dv,
      website,
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
      civilStatus,
      birthPlace,
      nationality,
      city: cityPerson,
      state: statePerson,
      idNumber: personIdNumber,
      idType: personIdType,
      phone: phonePerson,
      province: provincePerson,
      email: emailPerson,
      district: districtPerson,
      country: countryPerson,
      jurisdiction: jurisdictionPerson,
      isConsolidator: isConsolidatorPerson,
    },
  },
} = detailForm;

const detailValidations = {
  juridical: Yup.object().shape({
    [company.name]: Yup.string().required(company.errorMsg),
    [country.name]: Yup.number().required(country.errorMsg),
    [address.name]: Yup.string().required(address.errorMsg),
    [relatedPartners.name]: Yup.array(),
    [document.name]: Yup.string().nullable(),
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
    [state.name]: Yup.string().when([country.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required(state.errorMsg),
    }),
    [city.name]: Yup.string().when([country.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required(city.errorMsg),
    }),
    [zip.name]: Yup.string().nullable(),
    [consolidator.name]: Yup.number().nullable(),
    [industry.name]: Yup.string().required(industry.errorMsg),
    [isConsolidator.name]: Yup.boolean().nullable(),
    [website.name]: Yup.string().nullable(),
    [fileNumber.name]: Yup.string().nullable(),
    [imageNumber.name]: Yup.string().nullable(),
    [isResidential.name]: Yup.boolean().nullable(),
    [rollNumber.name]: Yup.string().nullable(),
  }),
  person: Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [countryPerson.name]: Yup.number().required(countryPerson.errorMsg),
    [isMale.name]: Yup.boolean().required(isMale.errorMsg),
    [birthPlace.name]: Yup.string().required(birthPlace.errorMsg),
    [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
    [birthDate.name]: Yup.string().nullable(),
    [isConsolidatorPerson.name]: Yup.boolean().nullable(),
    [personIdNumber.name]: Yup.string().required(document.errorMsg),
    [personIdType.name]: Yup.string().required(document.errorMsg),
    [emailPerson.name]: Yup.string().email().required(email.errorMsg),
    [civilStatus.name]: Yup.string().nullable(),
    [phonePerson.name]: Yup.string().required(phone.errorMsg),
    [nationality.name]: Yup.number().required(nationality.errorMsg),
    [jurisdictionPerson.name]: Yup.number().when([countryPerson.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(jurisdictionPerson.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
    [districtPerson.name]: Yup.number().when([countryPerson.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(districtPerson.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
    [provincePerson.name]: Yup.number().when([countryPerson.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(province.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
    [state.name]: Yup.string().when([countryPerson.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required(statePerson.errorMsg),
    }),
    [cityPerson.name]: Yup.string().when([countryPerson.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required(city.errorMsg),
    }),
  }),
};

export default detailValidations;
