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
    relatedPartnerId,
    partnerTypeId,
    startDate,
    endDate,
    active,
    seat,
    checkIn,
    deed,
    deedDate,
    legalCircuit,
    notary,
    sheet,
  },
} = checkout;

const validations = Yup.object().shape({
  [relatedPartnerId.name]: Yup.string().required(relatedPartnerId.errorMsg),
  [partnerTypeId.name]: Yup.string().required(partnerTypeId.errorMsg),
  [startDate.name]: Yup.string().required(startDate.errorMsg),
  [endDate.name]: Yup.string().nullable(),
  [active.name]: Yup.boolean().required(active.errorMsg),
  [seat.name]: Yup.string(),
  [checkIn.name]: Yup.date(),
  [deed.name]: Yup.string(),
  [deedDate.name]: Yup.date(),
  [legalCircuit.name]: Yup.string(),
  [notary.name]: Yup.string(),
  [sheet.name]: Yup.string(),
});
export default validations;
