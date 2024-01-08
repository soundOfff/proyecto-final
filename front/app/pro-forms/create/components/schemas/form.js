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

// Ver nombre de campos porque todavia no tengo las tablas

const form = {
  formId: "new-expense",
  formField: {
    partner: {
      name: "partner_id",
      label: "Cliente",
      errorMsg: "Debe seleccionar un cliente",
    },
    number: {
      name: "number",
      label: "Número de Proforma",
      errorMsg: "Debe ingresar un numero de proforma",
    },
    dateFrom: {
      name: "date_from",
      label: "Fecha desde",
      errorMsg: "La fecha desde es requerida",
    },
    dateTo: {
      name: "date_to",
      label: "Fecha hasta",
      errorMsg: "La fecha hasta es requerida",
    },
    serviceType: {
      name: "service_id",
      label: "Tipo de servicio",
      errorMsg: "El tipo de servicio es requerido",
    },
    retainingAgent: {
      name: "agent_id",
      label: "Agente retenedor",
      errorMsg: "El agente es requerido",
    },
    subServiceType: {
      name: "sub_service_id",
      label: "Sub tipo de servicio",
      errorMsg: "El sub tipo de servicio es requerido",
    },
    stopPendingRemainder: {
      name: "stop_pending_remainder",
      label: "Impedir el envío de recordatorios pendientes para esta factura",
    },
    labels: {
      name: "labels",
      label: "Etiquetas",
    },
    currency: {
      name: "currency_id",
      label: "Moneda",
      errorMsg: "Debe seleccionar una Moneda",
    },
    state: {
      name: "state_id",
      label: "Estado",
      errorMsg: "Debe seleccionar un estado",
    },
    reference: {
      name: "reference_number",
      label: "Referencia #",
    },
    agent: {
      name: "agent_id",
      label: "Agente",
      errorMsg: "Debe seleccionar un agente",
    },
    repeat: {
      name: "repeat_id",
      label: "Facturas recurrentes?",
    },
    discountType: {
      name: "discount_type",
      label: "Tipo de descuento",
    },
    note: {
      name: "note",
      label: "Notas del admin",
      type: "text",
    },
  },
};

export default form;
