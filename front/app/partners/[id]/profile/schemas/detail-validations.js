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
      isConsolidator,
      language,
      website,
      consolidator,
    },

    person: { name, birthDate, expeditionDate, expirationDate, isMale, number },
  },
} = detailForm;

const detailValidations = {
  juridical: Yup.object().shape({
    [company.name]: Yup.string().required(company.errorMsg),
    [state.name]: Yup.string().nullable(),
    [country.name]: Yup.number().required(country.errorMsg),
    [zip.name]: Yup.string().nullable(),
    [address.name]: Yup.string().nullable(),
    [ruc.name]: Yup.string().nullable(),
    [city.name]: Yup.string().nullable(),
    [phone.name]: Yup.string().nullable(),
    [consolidator.name]: Yup.number().required(consolidator.errorMsg),
  }),
  person: Yup.object().shape({
    [name.name]: Yup.string().required(name.errorMsg),
    [country.name]: Yup.number().required(country.errorMsg),
    [birthDate.name]: Yup.string().required(),
    [expeditionDate.name]: Yup.string().required(),
    [expirationDate.name]: Yup.string().required(),
    [isMale.name]: Yup.boolean().required(),
    [number.name]: Yup.string().required(),
  }),
};

export default detailValidations;
