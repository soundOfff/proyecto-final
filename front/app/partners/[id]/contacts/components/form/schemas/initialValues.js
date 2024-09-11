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

import checkout from "./form";

const {
  formField: {
    partner,
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
    estimateEmails,
    title,
    permissions,
  },
} = checkout;

const initialValues = {
  [partner.name]: "",
  [email.name]: "",
  [firstName.name]: "",
  [lastName.name]: "",
  [title.name]: "",
  [password.name]: "",
  [phoneNumber.name]: "",
  [profileImage.name]: "",
  [isPrimary.name]: false,
  [contractEmails.name]: false,
  [creditNoteEmails.name]: false,
  [invoiceEmails.name]: false,
  [projectEmails.name]: false,
  [taskEmails.name]: false,
  [ticketEmails.name]: false,
  [estimateEmails.name]: false,
  [permissions.name]: [],
};

export default initialValues;
