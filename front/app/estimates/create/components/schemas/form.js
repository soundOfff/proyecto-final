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
      errorMsg: "Debe ingresar un número de proforma",
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
    subServiceType: {
      name: "sub_service_type_id",
      label: "Sub tipo de servicio",
      errorMsg: "El sub tipo de servicio es requerido",
    },
    stopPendingRemainder: {
      name: "cancel_overdue_remainder",
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
    status: {
      name: "estimate_status_id",
      label: "Estado",
      errorMsg: "Debe seleccionar un estado",
    },
    reference: {
      name: "reference_no",
      label: "Referencia",
    },
    hasRetainingAgent: {
      name: "has_retaining_agent",
      label: "Agente retenedor",
    },
    agent: {
      name: "sale_agent_id",
      label: "Agente",
      errorMsg: "Debe seleccionar un agente",
    },
    recurring: {
      name: "recurring_id",
      label: "¿Facturas recurrentes?",
    },
    discountType: {
      name: "discount_type_id",
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
      name: "line_item_type_id",
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
      name: "discount",
      label: "Descuento",
      placeholder: "USD",
      type: "number",
    },
    adjustment: {
      name: "adjustment",
      label: "Ajuste",
      placeholder: "USD",
      type: "number",
    },
    unit: {
      name: "unit",
      label: "Mostrar la cantidad como:",
    },
    items: {
      name: "items",
      label: "Articulos",
      errorMsg: "Debe seleccionar al menos un item",
    },
    totalDiscount: {
      name: "discount_total",
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
    expenses: {
      name: "expenses",
    },
  },
};

export default form;
