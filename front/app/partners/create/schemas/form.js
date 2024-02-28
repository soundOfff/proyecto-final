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

const detailForm = {
  formId: "partner",
  formField: {
    juridical: {
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
        name: "country_id",
        label: "País",
        errorMsg: "Debe seleccionar un país",
      },
      zip: {
        name: "zip",
        label: "Código Postal",
        type: "text",
      },
      phone: {
        name: "phone_number",
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
        name: "consolidator_id",
        label: "Cliente Consolidador",
        errorMsg: "Debe seleccionar un consolidador",
      },
      language: {
        name: "language",
        label: "Idioma Predeterminado",
      },
    },

    person: {
      name: {
        name: "name",
        label: "Nombre",
        type: "text",
        errorMsg: "El nombre es requerido",
      },
      number: {
        name: "number",
        label: "Número de Identificación",
        type: "text",
        errorMsg: "El número de identificación es requerido",
      },
      birthDate: {
        name: "birth_date",
        label: "Fecha de Nacimiento",
        errorMsg: "La fecha de nacimiento es requerida",
      },
      expeditionDate: {
        name: "expedition_date",
        label: "Fecha de Expedición",
        errorMsg: "La fecha de expedición es requerido",
      },
      expirationDate: {
        name: "expiration_date",
        label: "Fecha de Expiración",
        errorMsg: "La fecha de expiración es requerido",
      },
      isMale: {
        name: "is_male",
        label: "Hombre/Mujer",
      },
      country: {
        name: "country_id",
        label: "País",
        errorMsg: "Debe seleccionar un país",
      },
    },

    invoice: {
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
  },
};

export default detailForm;
