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
      label: "Honorarios",
      type: "number",
      placeholder: "1000",
      errorMsg: "Los honorarios del caso son requeridos",
    },
    billingType: {
      name: "project_billing_type_id",
      label: "Tipo de Facturación",
      errorMsg: "Debe seleccionar un tipo de facturación",
    },
    billablePartner: {
      name: "billable_partner_id",
      label: "Cliente Facturable",
      errorMsg: "Debe seleccionar un cliente facturable",
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
    demandAmount: {
      name: "demand_amount",
      label: "Monto Demandado",
      type: "number",
      placeholder: "1000",
      errorMsg: "El monto demandado es requerido",
    },
    courtId: {
      name: "court_id",
      label: "Juzgado",
    },
    serviceType: {
      name: "project_service_type_id",
      label: "Departamento",
      errorMsg: "Debe seleccionar un departamento",
    },
    process: {
      name: "process_id",
      label: "Proceso",
    },
    type: {
      name: "type",
      label: "Tipo De Caso",
    },
    selectedMembers: {
      name: "project_members",
      label: "Miembros Del Caso",
      errorMsg: "Debe seleccionar al menos un miembro",
    },
    proposal: {
      name: "proposal_id",
      label: "Propuesta",
    },
    expedient: {
      name: "expedient",
      label: "Expediente",
      type: "text",
      placeholder: "0001",
      errorMsg: "El expediente es requerido",
    },
    startDate: {
      name: "start_date",
      label: "Fecha de Inicio",
      errorMsg: "Debe seleccionar una fecha de inicio",
    },
    hasDeadline: {
      name: "has_deadline",
      label: "¿El caso tiene fecha de entrega?",
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
    description: {
      name: "description",
      label: "Descripción del Caso",
      type: "hidden",
      errorMsg: "La descripción es requerida",
    },
    notes: {
      name: "notes",
      label: "Notas",
    },
  },
};

export default form;
