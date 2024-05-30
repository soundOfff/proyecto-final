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

const validations = Yup.object().shape({
  [profileImage.name]: Yup.string().nullable(),
  [firstName.name]: Yup.string().required(firstName.requiredErrorMsg),
  [lastName.name]: Yup.string().required(lastName.requiredErrorMsg),
  [email.name]: Yup.string().email().required(email.requiredErrorMsg),
  [hourlyRate.name]: Yup.number().required(hourlyRate.requiredErrorMsg),
  [phoneNumber.name]: Yup.string().required(phoneNumber.requiredErrorMsg),
  [facebook.name]: Yup.string().nullable(),
  [linkedin.name]: Yup.string().nullable(),
  [skype.name]: Yup.string().nullable(),
  [defaultLanguage.name]: Yup.string().nullable(),
  [emailSignature.name]: Yup.string().nullable(),
  [password.name]: Yup.string().required(password.requiredErrorMsg),
  [departments.name]: Yup.array().nullable(),
  [welcomeEmail.name]: Yup.bool(),
  [admin.name]: Yup.bool(),
});
export default validations;
