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
  formId: "new-slack-message",
  formField: {
    staff: {
      name: "staff_id",
      label: "Staff",
      type: "number",
    },
    title: {
      name: "header",
      label: "Título",
      type: "text",
    },
    body: {
      name: "body",
      label: "Cuerpo",
      type: "text",
    },
    url: {
      name: "url",
      label: "URL",
      type: "text",
      placeholder: "projects/3678",
    },
  },
};

export default form;
