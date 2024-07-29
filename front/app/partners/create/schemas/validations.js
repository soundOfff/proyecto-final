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
      civilStatus,
      birthPlace,
      nationality,
      occupation,
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
    [shippingCity.name]: Yup.string().nullable(),
    [shippingState.name]: Yup.string().nullable(),
    [shippingZip.name]: Yup.string().nullable(),
    [industry.name]: Yup.string().required(industry.errorMsg),
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
    [countryPerson.name]: Yup.number().required(countryPerson.errorMsg),
    [isMale.name]: Yup.boolean().required(isMale.errorMsg),
    [birthPlace.name]: Yup.string().required(birthPlace.errorMsg),
    [personIdNumber.name]: Yup.string().required(personIdNumber.errorMsg),
    [personIdType.name]: Yup.string(),
    [emailPerson.name]: Yup.string().email().required(email.errorMsg),
    [phonePerson.name]: Yup.string().required(phone.errorMsg),
    [nationality.name]: Yup.number().required(nationality.errorMsg),
    [provincePerson.name]: Yup.number().when([countryPerson.name], {
      is: (country) => country == PANAMA_ID,
      then: (schema) => schema.required(provincePerson.errorMsg),
      otherwise: (schema) => schema.nullable(),
    }),
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
    [civilStatus.name]: Yup.string().nullable(),
    [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
    [birthDate.name]: Yup.string().nullable(),
    [shippingCity.name]: Yup.string().nullable(),
    [shippingState.name]: Yup.string().nullable(),
    [shippingZip.name]: Yup.string().nullable(),
    [occupation.name]: Yup.string().nullable(),
    [shippingStreet.name]: Yup.string().nullable(),
    [shippingCountry.name]: Yup.number().nullable(),
    [billingCity.name]: Yup.string().nullable(),
    [billingState.name]: Yup.string().nullable(),
    [billingZip.name]: Yup.string().nullable(),
    [isConsolidatorPerson.name]: Yup.boolean().nullable(),
    [billingStreet.name]: Yup.string().nullable(),
    [billingCountry.name]: Yup.number().nullable(),
  }),
};

export default validations;
