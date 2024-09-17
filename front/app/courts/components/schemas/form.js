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
  formId: "new-court",
  formField: {
    name: {
      name: "name",
      label: "Nombre",
      errorMsg: "Debe ingresar un nombre de juzgado",
    },
    number: {
      name: "number",
      label: "Número",
      errorMsg: "Debe ingresar un número de juzgado",
    },
    description: {
      name: "description",
      label: "Descripción",
      errorMsg: "Debe ingresar una descripción",
    },
  },
};

export default form;
