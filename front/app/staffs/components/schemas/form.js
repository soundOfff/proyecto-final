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
  formId: "new-staff",
  formField: {
    profileImage: {
      name: "profile_image",
      label: "Imagen de perfil",
    },
    firstName: {
      name: "first_name",
      label: "Nombre",
      requiredErrorMsg: "El nombre es requerido",
    },
    lastName: {
      name: "last_name",
      label: "Apellido",
      requiredErrorMsg: "El apellido es requerido",
    },
    email: {
      name: "email",
      label: "Correo",
      requiredErrorMsg: "El correo es requerido",
    },
    hourlyRate: {
      name: "hourly_rate",
      label: "Tarifa por hora",
      requiredErrorMsg: "La tarifa por hora es requerida",
    },
    phoneNumber: {
      name: "phone_number",
      label: "Número de teléfono",
      requiredErrorMsg: "El número de teléfono es requerido",
    },
    facebook: {
      name: "facebook",
      label: "Facebook",
    },
    linkedin: {
      name: "linkedin",
      label: "Linkedin",
    },
    skype: {
      name: "skype",
      label: "Skype",
    },
    defaultLanguage: {
      name: "default_language",
      label: "Idioma predeterminado",
    },
    emailSignature: {
      name: "email_signature",
      label: "Firma de correo",
    },
    departments: {
      name: "departments",
      label: "Departamentos",
    },
    admin: {
      name: "admin",
      label: "Es administrador",
    },
    welcomeEmail: {
      name: "welcome_email",
      label: "Enviar correo de bienvenida",
    },
    token: {
      name: "api_token",
      label: "API Token",
    },
    password: {
      name: "password",
      label: "Contraseña",
      requiredErrorMsg: "La contraseña es requerida",
    },
  },
};

export default form;
