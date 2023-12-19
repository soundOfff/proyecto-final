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

const form = {
  formId: "partner",
  formField: {
    company: {
      name: "company",
      label: "Empresa",
      type: "text",
      errorMsg: "El nombre de la Empresa es requerida",
    },
    address: {
      name: "address",
      label: "Dirección",
      type: "text",
    },
    ruc: {
      name: "ruc",
      label: "RUC",
      type: "text",
      placeholder: "RUC",
    },
    city: {
      name: "city",
      label: "Ciudad",
      type: "text",
    },
    state: {
      name: "state",
      label: "Provincia",
      type: "text",
    },
    country: {
      name: "country",
      label: "País",
    },
    zip: {
      name: "zip",
      label: "Código Postal",
      type: "text",
    },
    phone: {
      name: "phoneNumber",
      label: "Teléfono",
      type: "text",
    },
    website: {
      name: "website",
      label: "Website",
      errorMsg: "Debe seleccionar un tipo de servicio",
    },
    isConsolidator: {
      name: "isConsolidator",
      label: "Consolidador",
    },
    consolidator: {
      name: "consolidator",
      label: "Cliente Consolidador",
      errorMsg: "Debe seleccionar un consolidador",
    },
    language: {
      name: "language",
      label: "Idioma Predeterminado",
    },
  },
};

export default form;
