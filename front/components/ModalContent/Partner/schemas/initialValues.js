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
    name,
    birthDate,
    expeditionDate,
    isMale,
    address,
    buildingNumber,
    city,
    district,
    email,
    isConsolidator,
    isResidential,
    jurisdiction,
    phone,
    province,
    state,
    number,
    country,
    idNumber,
    occupation,
    idType,
    civilStatus,
    birthPlace,
    nationality,
  },
} = form;

const initialValues = {
  [name.name]: "",
  [birthDate.name]: "",
  [expeditionDate.name]: "",
  [isMale.name]: "",
  [country.name]: PANAMA_ID,
  [number.name]: "",
  [idNumber.name]: "",
  [occupation.name]: "",
  [idType.name]: "",
  [civilStatus.name]: "",
  [address.name]: "",
  [buildingNumber.name]: "",
  [city.name]: "",
  [district.name]: "",
  [email.name]: "",
  [isConsolidator.name]: false,
  [isResidential.name]: false,
  [jurisdiction.name]: "",
  [phone.name]: "",
  [province.name]: "",
  [state.name]: "",
  [birthPlace.name]: PANAMA_ID,
  [nationality.name]: PANAMA_ID,
};

export default initialValues;
