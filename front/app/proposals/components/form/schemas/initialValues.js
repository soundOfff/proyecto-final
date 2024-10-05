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

import moment from "moment";
import checkout from "./form";
import { WITHOUT_DISCOUNT } from "/utils/constants/discountTypes";
import { DRAFT } from "/utils/constants/proposalStatuses";

const {
  formField: {
    partner,
    subject,
    date,
    openTill,
    tags,
    contact,
    currency,
    discountType,
    allowComments,
    status,
    staffAssigned,
    proposalTo,
    address,
    city,
    state,
    zip,
    phone,
    email,
    country,
    description,
    longDescription,
    type,
    quantity,
    rate,
    taxes,
    discount,
    adjustment,
    unit,
    items,
    totalDiscount,
    subtotal,
    totalTax,
    total,
  },
} = checkout;

const initialValues = {
  [partner.name]: "",
  [subject.name]: "",
  [contact.name]: "",
  [date.name]: moment().format("YYYY/MM/DD"),
  [openTill.name]: moment().add(1, "week").format("YYYY/MM/DD"),
  [tags.name]: [],
  [currency.name]: "",
  [discountType.name]: WITHOUT_DISCOUNT,
  [allowComments.name]: false,
  [status.name]: DRAFT,
  [staffAssigned.name]: "",
  [proposalTo.name]: "",
  [address.name]: "",
  [city.name]: "",
  [state.name]: "",
  [zip.name]: "",
  [phone.name]: "",
  [email.name]: "",
  [country.name]: "",
  [description.name]: "",
  [longDescription.name]: "",
  [type.name]: "",
  [quantity.name]: "",
  [rate.name]: "",
  [taxes.name]: [],
  [discount.name]: "",
  [adjustment.name]: "",
  [unit.name]: "",
  [items.name]: [],
  [totalDiscount.name]: "",
  [subtotal.name]: "",
  [totalTax.name]: "",
  [total.name]: "",
};

export default initialValues;
