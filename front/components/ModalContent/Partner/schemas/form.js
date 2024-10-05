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

const notJuridicalPartnerForm = {
  formId: "partner",
  formField: {
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
    isConsolidator: {
      name: "is_consolidator",
      label: "Cliente Consolidador",
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
    isMale: {
      name: "is_male",
      label: "Hombre/Mujer",
      errorMsg: "Debe seleccionar un género",
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
    idType: {
      name: "id_type",
      label: "Tipo de Identificación",
      errorMsg: "Debe seleccionar un tipo de identificación",
    },
    idNumber: {
      name: "id_number",
      label: "Número de Identificación",
      errorMsg: "El número de identificación es requerido",
    },
    civilStatus: {
      name: "civil_status",
      label: "Estado Civil",
      errorMsg: "Debe seleccionar un estado civil",
    },
    occupation: {
      name: "occupation",
      label: "Ocupación",
      type: "text",
      errorMsg: "La ocupación es requerida",
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
      errorMsg: "La ciudad es requerida",
    },
    state: {
      name: "state",
      label: "Provincia",
      type: "text",
      errorMsg: "La provincia es requerida",
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
      errorMsg: "El teléfono es requerido",
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
      errorMsg: "Debe seleccionar un tipo",
    },
  },
};

export default notJuridicalPartnerForm;
