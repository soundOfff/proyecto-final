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
    contractEmails,
    creditNoteEmails,
    email,
    firstName,
    invoiceEmails,
    isPrimary,
    lastName,
    password,
    phoneNumber,
    profileImage,
    projectEmails,
    taskEmails,
    ticketEmails,
    title,
    permissions,
  },
} = checkout;

const validations = Yup.object().shape({
  [email.name]: Yup.string().email().required(email.errorMsg),
  [firstName.name]: Yup.string().required(firstName.errorMsg),
  [lastName.name]: Yup.string().required(lastName.errorMsg),
  [title.name]: Yup.string(),
  [password.name]: Yup.string(),
  [phoneNumber.name]: Yup.string(),
  [profileImage.name]: Yup.string(),
  [isPrimary.name]: Yup.boolean(),
  [contractEmails.name]: Yup.boolean(),
  [creditNoteEmails.name]: Yup.boolean(),
  [invoiceEmails.name]: Yup.boolean(),
  [projectEmails.name]: Yup.boolean(),
  [taskEmails.name]: Yup.boolean(),
  [ticketEmails.name]: Yup.boolean(),
  [permissions.name]: Yup.array(),
});
export default validations;
