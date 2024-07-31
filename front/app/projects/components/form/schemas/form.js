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
  formId: "new-project",
  formField: {
    cost: {
      name: "cost",
      label: "Costo Total",
      type: "number",
      placeholder: "1000",
      errorMsg: "El costo del caso es requerido",
    },
    /*  estimatedHours: {
      name: "estimated_hours",
      label: "Horas Estimadas",
      type: "number",
      placeholder: "20",
      errorMsg: "La cantidad de horas es requerida",
    }, */
    expedient: {
      name: "expedient",
      label: "Expediente",
      type: "text",
      placeholder: "0001",
      errorMsg: "El expediente es requerido",
    },
    description: {
      name: "description",
      label: "Descripción del Caso",
      type: "hidden",
      errorMsg: "La descripción es requerida",
    },
    defendant: {
      name: "defendant_id",
      label: "Demandado",
      errorMsg: "Debe seleccionar un demandado",
    },
    plaintiff: {
      name: "plaintiff_id",
      label: "Demandante",
    },
    responsiblePersonId: {
      name: "responsible_person_id",
      label: "Persona Responsable",
      errorMsg: "Debe seleccionar una persona responsable",
    },
    status: {
      name: "project_status_id",
      label: "Estado",
      errorMsg: "Debe seleccionar un estado",
    },
    serviceType: {
      name: "project_service_type_id",
      label: "Departamento",
      errorMsg: "Debe seleccionar un departamento",
    },
    billingType: {
      name: "project_billing_type_id",
      label: "Tipo de Facturación",
      errorMsg: "Debe seleccionar un tipo de facturación",
    },
    selectedMembers: {
      name: "project_members",
      label: "Miembros Del Caso",
      errorMsg: "Debe seleccionar al menos un miembro",
    },
    startDate: {
      name: "start_date",
      label: "Fecha de Inicio",
      errorMsg: "Debe seleccionar una fecha de inicio",
    },
    deadline: {
      name: "deadline",
      label: "Fecha de Entrega",
      errorMsg: "Debe seleccionar una fecha de entrega",
    },
    partners: {
      name: "partners",
      label: "Personas Relacionadas",
    },
    proposal: {
      name: "proposal_id",
      label: "Propuesta",
    },
  },
};

export default form;
