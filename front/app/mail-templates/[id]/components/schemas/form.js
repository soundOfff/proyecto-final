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

const templateForm = {
  formId: "mail-template",
  formField: {
    name: {
      name: "name",
      label: "Nombre",
      requiredErrorMsg: "Nombre es requerido",
    },
    groupId: {
      name: "mail_template_group_id",
      label: "Grupo",
    },
    event: {
      name: "event",
      label: "Evento",
      requiredErrorMsg: "Evento es requerido",
    },
    sendFrom: {
      name: "send_from",
      label: "Enviar desde",
      requiredErrorMsg: "Enviar desde es requerido",
    },
    subject: {
      name: "subject",
      label: "Asunto",
      requiredErrorMsg: "Asunto es requerido",
    },
    body: {
      name: "body",
      label: "Contenido del email",
      requiredErrorMsg: "Contenido es requerido",
    },
    disabled: {
      name: "disabled",
      label: "Deshabilitado",
    },
    formatted: {
      name: "formatted",
      label: "Formato",
    },
  },
};

export default templateForm;
