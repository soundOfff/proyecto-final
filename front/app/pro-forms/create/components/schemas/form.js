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

// TODO: Ver nombre de campos porque todavia no tengo las tablas

const form = {
  formId: "new-expense",
  formField: {
    partner: {
      name: "partner_id",
      label: "Cliente",
      errorMsg: "Debe seleccionar un cliente",
    },
    project: {
      name: "project_id",
      label: "Caso",
      errorMsg: "Debe seleccionar un caso",
    },
    number: {
      name: "number",
      label: "Número de Proforma",
      errorMsg: "Debe ingresar un numero de proforma",
    },
    dateFrom: {
      name: "date",
      label: "Fecha desde",
      errorMsg: "La fecha desde es requerida",
    },
    dateTo: {
      name: "expiry_date",
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
    tags: {
      name: "tags",
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
      name: "reference_no",
      label: "Referencia",
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
    adminNote: {
      name: "admin_note",
      label: "Notas del admin",
      type: "text",
    },
    clientNote: {
      name: "client_note",
      label: "Notas del cliente",
      type: "text",
    },
    terms: {
      name: "terms",
      label: "Términos y Condiciones",
      type: "text",
    },
    description: {
      name: "description",
      label: "Artículo",
      type: "text",
      errorMsg: "El artículo es requerido",
    },
    longDescription: {
      name: "long_description",
      label: "Descripción larga",
      type: "text",
    },
    type: {
      name: "item_type",
      label: "Tipo de articulo",
    },
    quantity: {
      name: "quantity",
      label: "Cantidad",
      type: "number",
      errorMsg: "La cantidad es requerida",
    },
    rate: {
      name: "rate",
      label: "Precio",
      type: "number",
      errorMsg: "El precio es requerido",
    },
    taxes: {
      name: "taxes",
      label: "Impuestos",
    },
    discount: {
      name: "item_discount",
      label: "Descuento",
      placeholder: "USD",
      type: "number",
    },
    adjustment: {
      name: "item_adjustment",
      label: "Ajuste",
      placeholder: "USD",
      type: "number",
    },
    items: {
      name: "items",
      label: "Articulos",
      errorMsg: "Debe seleccionar al menos un item",
    },
    subtotal: {
      name: "subtotal",
    },
    totalTax: {
      name: "total_tax",
    },
    total: {
      name: "total",
    },
  },
};

export default form;
