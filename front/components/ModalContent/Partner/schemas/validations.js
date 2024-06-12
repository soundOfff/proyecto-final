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
    name,
    birthDate,
    expeditionDate,
    isMale,
    country,
    email,
    civilStatus,
    occupation,
    phone,
    idNumber,
    idType,
    number,
    birthPlace,
    isConsolidator: isConsolidatorPerson,
    nationality,
  },
} = form;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [country.name]: Yup.number().required(country.errorMsg),
  [idNumber.name]: Yup.string().required(idNumber.errorMsg),
  [idType.name]: Yup.string().required(idType.errorMsg),
  [email.name]: Yup.string().email().required(email.errorMsg),
  [phone.name]: Yup.string().required(phone.errorMsg),
  [civilStatus.name]: Yup.string().required(civilStatus.errorMsg),
  [isMale.name]: Yup.boolean().required(isMale.errorMsg),
  [birthPlace.name]: Yup.string().required(birthPlace.errorMsg),
  [expeditionDate.name]: Yup.date().max(new Date()).nullable(),
  [birthDate.name]: Yup.string().nullable(),
  [occupation.name]: Yup.string().nullable(),
  [isConsolidatorPerson.name]: Yup.boolean().nullable(),
  [nationality.name]: Yup.number().nullable(),
});

export default validations;
