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
    initialDurationMinutes: {
      name: "initial_duration_minutes",
      label: "Duración inicial de la tarea (en minutos)",
    },
    name: {
      name: "name",
      label: "Tema",
      errorMsg: "Debe ingresar un tema",
    },
    hourlyRate: {
      name: "hourly_rate",
      label: "Precio por hora",
      errorMsg: "Debe ingresar un precio por hora",
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
    task_status_id: {
      name: "status",
      label: "Estado",
    },
    partner_id: {
      name: "partner_id",
      label: "Cliente",
      errorMsg: "Debe seleccionar un cliente",
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
      placeholder: "Número de días",
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
      errorMsg: "Debe seleccionar un caso relacionado",
    },
    dependencies: {
      name: "dependencies",
      label: "Dependencias",
    },
    description: {
      name: "description",
      label: "Descripción",
    },
    actions: {
      name: "actions",
      label: "Acciones",
    },
    requiredFields: {
      name: "requiredFields",
      label: "Campos requeridos",
    },
    isFileNeeded: {
      name: "is_file_needed",
      label: "Se necesita un archivo",
    },
    assigneds: {
      name: "assigneds",
      label: "Asignados",
    },
  },
};

export default form;
