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

import { ADMINISTRATIVE } from "/utils/constants/projectServiceTypes";
import checkout from "./form";

const {
  formField: {
    profileImage,
    firstName,
    lastName,
    email,
    hourlyRate,
    phoneNumber,
    facebook,
    linkedin,
    skype,
    defaultLanguage,
    emailSignature,
    admin,
    departments,
    password,
    welcomeEmail,
  },
} = checkout;

const initialValues = {
  [profileImage.name]: "",
  [firstName.name]: "",
  [lastName.name]: "",
  [email.name]: "",
  [hourlyRate.name]: "",
  [phoneNumber.name]: "",
  [facebook.name]: "",
  [linkedin.name]: "",
  [skype.name]: "",
  [defaultLanguage.name]: "",
  [emailSignature.name]: "",
  [password.name]: "",
  [departments.name]: [],
  [welcomeEmail.name]: false,
  [admin.name]: false,
};

export default initialValues;
