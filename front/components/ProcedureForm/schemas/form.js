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
  formId: "new-procedure",
  formField: {
    name: {
      name: "name",
      label: "Nombre",
      errorMsg: "Debe ingresar un nombre",
    },
    description: {
      name: "description",
      label: "Descripción",
    },
    status: {
      name: "procedure_status_id",
      label: "Estado",
      errorMsg: "Debe seleccionar un estado",
    },
    responsible: {
      name: "responsible_id",
      label: "Responsable",
      errorMsg: "Debe seleccionar un responsable",
    },
    stepNumber: {
      name: "step_number",
      label: "Paso N°",
      type: "number",
      errorMsg: "Debe seleccionar el número de paso",
    },
    dependencies: {
      name: "dependencies",
      label: "Dependencias",
    },
    actions: {
      name: "actions",
      label: "Acciones",
    },
  },
};

export default form;
