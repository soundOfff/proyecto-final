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
  formId: "new-timer",
  formField: {
    task: {
      name: "task_id",
    },
    startTime: {
      name: "start_time",
      label: "Hora de Inicio",
      errorMsg: "Debe seleccionar una fecha de inicio",
    },
    endTime: {
      name: "end_time",
      label: "Hora de Finalización",
      errorMsg: "Debe seleccionar una fecha de finalización",
    },
    staff: {
      name: "staff_id",
      label: "Miembro",
      errorMsg: "Debe seleccionar un miembro",
    },
    note: {
      name: "note",
      label: "Nota",
    },
    tags: {
      name: "tags",
      label: "Etiquetas",
    },
  },
};

export default form;
