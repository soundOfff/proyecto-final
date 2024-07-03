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

const {
  formField: { body, name, event, sendFrom, subject, disabled, formatted },
} = form;

const initialValues = {
  [name.name]: "",
  [event.name]: "",
  [sendFrom.name]: "",
  [subject.name]: "",
  [body.name]: "",
  [disabled.name]: false,
  [formatted.name]: false,
};

export default initialValues;
