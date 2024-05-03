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
      ruc: {
        name: "ruc",
        label: "RUC",
        type: "text",
        placeholder: "RUC",
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
        label: "Jurisdicción",
        errorMsg: "Debe seleccionar una jurisdicción",
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
      president: {
        name: "president_id",
        label: "Presidente",
      },
      secretary: {
        name: "secretary_id",
        label: "Secretario",
      },
      treasurer: {
        name: "treasurer_id",
        label: "Tesorero",
      },
      dv: {
        name: "dv",
        label: "DV",
        type: "text",
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
