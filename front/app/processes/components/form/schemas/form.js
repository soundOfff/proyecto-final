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
  formId: "new-process",
  formField: {
    name: {
      name: "name",
      label: "Nombre",
      errorMsg: "El Nombre es obligatorio",
    },
    description: {
      name: "description",
      label: "Descripción",
    },
    stepQuantity: {
      name: "step_quantity",
      type: "number",
      label: "Cantidad de Pasos",
      errorMsg: "La Cantidad de Pasos es obligatoria",
    },
    projectServiceType: {
      name: "project_service_type_id",
      label: "Departamento",
      errorMsg: "El Tipo de Caso es obligatorio",
    },
    forks: {
      name: "forks",
      label: "Subprocesos",
    },
  },
};

export default form;
