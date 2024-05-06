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
    [state.name]: Yup.string().nullable(),
    [zip.name]: Yup.string().nullable(),
    [address.name]: Yup.string().nullable(),
    [ruc.name]: Yup.string().nullable(),
    [city.name]: Yup.string().nullable(),
    [phone.name]: Yup.string().nullable(),
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
    [district.name]: Yup.number().nullable(),
    [email.name]: Yup.string().nullable(),
    [fileNumber.name]: Yup.string().nullable(),
    [imageNumber.name]: Yup.string().nullable(),
    [isResidential.name]: Yup.boolean().nullable(),
    [jurisdiction.name]: Yup.number().nullable(),
    [province.name]: Yup.number().nullable(),
    [rollNumber.name]: Yup.string().nullable(),
  }),
  person: Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [country.name]: Yup.number().required(country.errorMsg),
    [isMale.name]: Yup.boolean().required(isMale.errorMsg),
    [number.name]: Yup.string().required(number.errorMsg),
    [birthPlace.name]: Yup.string().required(birthPlace.errorMsg),
    [birthDate.name]: Yup.string().nullable(),
    [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
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
