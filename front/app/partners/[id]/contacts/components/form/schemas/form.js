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
  formId: "new-task",
  formField: {
    partner: {
      name: "partner_id",
    },
    firstName: {
      name: "first_name",
      label: "Nombre",
      errorMsg: "El nombre es requerido",
    },
    lastName: {
      name: "last_name",
      label: "Apellido",
      errorMsg: "El apellido es requerido",
    },
    email: {
      name: "email",
      label: "Email",
      errorMsg: "El email es requerido",
    },
    password: {
      name: "password",
      label: "Contraseña",
      errorMsg: "La contraseña es requerida",
    },
    isPrimary: {
      name: "is_primary",
      label: "Contacto Principal",
    },
    title: {
      name: "title",
      label: "Posición/Cargo",
    },
    phoneNumber: {
      name: "phone_number",
      label: "Teléfono",
    },
    contractEmails: {
      name: "contract_emails",
      label: "Contrato",
    },
    creditNoteEmails: {
      name: "credit_note_emails",
      label: "Notas de Crédito",
    },
    profileImage: {
      name: "profile_image",
      label: "Imagen de Perfil",
    },
    invoiceEmails: {
      name: "invoice_emails",
      label: "Facturas",
    },
    projectEmails: {
      name: "project_emails",
      label: "Casos",
    },
    taskEmails: {
      name: "task_emails",
      label: "Tareas",
    },
    ticketEmails: {
      name: "ticket_emails",
      label: "Tickets",
    },
    estimateEmails: {
      name: "estimate_emails",
      label: "Proformas",
    },
    permissions: {
      name: "permissions",
      label: "Permisos",
    },
  },
};

export default form;
