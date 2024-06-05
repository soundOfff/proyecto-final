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
        label: "Razón social",
        type: "text",
        errorMsg: "La Razón Social es requerida",
      },
      ruc: {
        name: "ruc",
        label: "RUC",
        type: "text",
        placeholder: "RUC",
        errorMsg: "El RUC es requerido",
      },
      country: {
        name: "country_id",
        label: "País",
        errorMsg: "Debe seleccionar un país",
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
        errorMsg: "Debe seleccionar una provincia",
      },
      industry: {
        name: "industry",
        label: "Industria",
        errorMsg: "Debe ingresar una industria",
      },
      document: {
        name: "document",
        label: "Folio",
        errorMsg: "Debe ingresar un documento",
      },
      section: {
        name: "section",
        label: "Sección",
        errorMsg: "Debe ingresar una sección",
      },
      province: {
        name: "province_id",
        label: "Provincia",
        errorMsg: "Debe seleccionar una provincia",
      },
      district: {
        name: "district_id",
        label: "Distrito",
        errorMsg: "Debe seleccionar un distrito",
      },
      jurisdiction: {
        name: "jurisdiction_id",
        label: "Corregimiento",
        errorMsg: "Debe seleccionar una corregimiento",
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
        errorMsg: "El teléfono es requerido",
      },
      website: {
        name: "website",
        label: "Website",
        errorMsg: "Debe seleccionar un tipo de servicio",
      },
      isConsolidator: {
        name: "is_consolidator",
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
      address: {
        name: "address",
        label: "Dirección",
        type: "text",
        errorMsg: "La dirección es requerida",
      },
      email: {
        name: "email",
        label: "Email",
        type: "email",
        errorMsg: "El email es requerido",
      },
      isResidential: {
        name: "is_residential",
        label: "Tipo",
      },
      buildingNumber: {
        name: "building_number",
        label: "Número de casa/apartamento/edificio",
      },
      fileNumber: {
        name: "file_number",
        label: "Número de Archivo",
        type: "text",
      },
      rollNumber: {
        name: "roll_number",
        label: "Número de Rollo",
        type: "text",
      },
      imageNumber: {
        name: "image_number",
        label: "Número de Imagen",
        type: "text",
      },
      dv: {
        name: "dv",
        label: "DV",
        type: "text",
        errorMsg: "El DV es requerido",
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
      isConsolidator: {
        name: "is_consolidator",
        label: "Cliente Consolidador",
      },
      isMale: {
        name: "is_male",
        label: "Hombre/Mujer",
      },
      nationality: {
        name: "nationality_id",
        label: "Nacionalidad",
        errorMsg: "Debe seleccionar un país",
      },
      birthPlace: {
        name: "birth_place_id",
        label: "Lugar de Nacimiento",
        errorMsg: "Debe seleccionar un país",
      },
      country: {
        name: "country_id",
        label: "País",
        errorMsg: "Debe seleccionar un país",
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
      province: {
        name: "province_id",
        label: "Provincia",
        errorMsg: "Debe seleccionar una provincia",
      },
      district: {
        name: "district_id",
        label: "Distrito",
        errorMsg: "Debe seleccionar un distrito",
      },
      jurisdiction: {
        name: "jurisdiction_id",
        label: "Corregimiento",
        errorMsg: "Debe seleccionar un corregimiento",
      },
      phone: {
        name: "phone_number",
        label: "Teléfono",
        type: "text",
      },
      address: {
        name: "address",
        label: "Dirección",
        type: "text",
      },
      email: {
        name: "email",
        label: "Email",
        type: "email",
      },
      isResidential: {
        name: "is_residential",
        label: "Tipo",
      },
      buildingNumber: {
        name: "building_number",
        label: "Número de casa/apartamento/edificio",
        type: "text",
      },
    },
  },
};

export default detailForm;
