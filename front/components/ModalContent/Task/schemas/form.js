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
    isPublic: {
      name: "is_public",
      label: "Público",
    },
    billable: {
      name: "billable",
      label: "Facturable",
    },
    name: {
      name: "name",
      label: "Tema",
      errorMsg: "Debe ingresar un tema",
    },
    hourlyRate: {
      name: "hourly_rate",
      label: "Precio por hora",
    },
    startDate: {
      name: "start_date",
      label: "Fecha de inicio",
      errorMsg: "Debe ingresar una fecha de inicio",
    },
    dueDate: {
      name: "due_date",
      label: "Fecha de vencimiento",
    },
    task_priority_id: {
      name: "task_priority_id",
      label: "Prioridad",
      errorMsg: "Debe seleccionar una prioridad",
    },
    owner_id: {
      name: "owner_id",
      label: "Propietario",
    },
    task_status_id: {
      name: "status",
      label: "Estado",
    },
    partner_id: {
      name: "partner_id",
      label: "Cliente",
      errorMsg: "Debe asignar a un cliente",
    },
    repeat: {
      name: "repeat_id",
      label: "Repetir cada",
      errorMsg: "Debe seleccionar una opción de repetición",
    },
    recurring: {
      name: "recurring",
      type: "number",
      errorMsg: "Debe ingresar un número de días",
    },
    recurringType: {
      name: "recurring_type",
    },
    isInfinite: {
      name: "is_infinite",
      label: "Infinito",
    },
    totalCycles: {
      name: "total_cycles",
      type: "number",
      label: "Ciclos Totales",
    },
    taskableType: {
      name: "taskable_type",
      label: "Relacionado con",
    },
    taskableId: {
      name: "taskable_id",
      label: "* Caso",
      errorMsg: "Debe ingresar un ID al que la tarea relacionado",
    },
    tags: {
      name: "tags",
      label: "Etiquetas",
    },
    description: {
      name: "description",
      label: "Descripción",
    },
    actions: {
      name: "actions",
      label: "Acciones",
    },
  },
};

export default form;
