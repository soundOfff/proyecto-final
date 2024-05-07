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
  formId: "new-item",
  formField: {
    description: {
      name: "description",
      label: "Descripción",
      errorMsg: "Debe ingresar una descripción",
    },
    longDescription: {
      name: "long_description",
      label: "Descripción larga",
      errorMsg: "Debe ingresar una descripción larga",
    },
    rate: {
      name: "rate",
      label: "Importe",
      errorMsg: "Debe ingresar un importe",
    },
    tax: {
      name: "tax_id",
      label: "Impuesto 1",
    },
    tax2: {
      name: "tax2_id",
      label: "Impuesto 2",
    },
    itemGroupId: {
      name: "item_group_id",
      label: "Grupo",
      errorMsg: "Debe seleccionar un grupo",
    },
  },
};

export default form;
