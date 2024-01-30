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

const invoiceForm = {
  formId: "partner",
  formField: {
    billingStreet: {
      name: "billing_street",
      label: "Calle",
      type: "text",
    },
    billingCity: {
      name: "billing_city",
      label: "Localidad",
      type: "text",
    },
    billingState: {
      name: "billing_state",
      label: "Departamento",
      type: "text",
    },
    billingZip: {
      name: "billing_zip",
      label: "Código Postal",
      type: "text",
    },
    billingCountry: {
      name: "billing_country_id",
      label: "País",
    },
    shippingStreet: {
      name: "shipping_street",
      label: "Calle",
      type: "text",
    },
    shippingCity: {
      name: "shipping_city",
      label: "Localidad",
      type: "text",
    },
    shippingState: {
      name: "shipping_state",
      label: "Departamento",
      type: "text",
    },
    shippingZip: {
      name: "shipping_zip",
      label: "Código Postal",
      type: "text",
    },
    shippingCountry: {
      name: "shipping_country_id",
      label: "País",
    },
  },
};

export default invoiceForm;
