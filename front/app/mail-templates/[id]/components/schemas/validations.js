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
  formField: { body, name, event, sendFrom, subject },
} = form;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.requiredErrorMsg),
  [event.name]: Yup.string().required(event.requiredErrorMsg),
  [sendFrom.name]: Yup.string().required(sendFrom.requiredErrorMsg),
  [subject.name]: Yup.string().required(subject.requiredErrorMsg),
  [body.name]: Yup.string().required(body.requiredErrorMsg),
});

export default validations;
