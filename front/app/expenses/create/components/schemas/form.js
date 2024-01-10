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
    name: {
      name: "name",
      label: "Nombre",
      type: "text",
    },
    note: {
      name: "note",
      label: "Nota",
      type: "text",
    },
    category: {
      name: "expense_category_id",
      label: "Categoría del Gasto",
      errorMsg: "La categoría del gasto es requerida",
    },
    billable: {
      name: "billable",
      label: "Facturable",
    },
    date: {
      name: "date",
      label: "Fecha de Gastos",
      errorMsg: "La fecha es requerido",
    },
    amount: {
      name: "amount",
      label: "Importe",
      errorMsg: "El importe es requerido",
    },
    partner: {
      name: "partner_id",
      label: "Cliente",
      errorMsg: "Debe seleccionar un cliente",
    },
    invoice: {
      name: "invoice_id",
      label: "Factura",
    },
    currency: {
      name: "currency_id",
      label: "Moneda",
      errorMsg: "Debe seleccionar una Moneda",
    },
    tax: {
      name: "tax_id",
      label: "Impuesto 1",
    },
    tax2: {
      name: "tax2_id",
      label: "Impuesto 2",
    },
    paymentMethod: {
      name: "payment_method_id",
      label: "Forma de Pago",
      errorMsg: "Debe seleccionar modo de pago",
    },
    reference: {
      name: "reference_no",
      label: "Referencia #",
    },
    repeat: {
      name: "repeat_id",
      label: "Repetir cada",
    },
    recurring: {
      name: "recurring",
      type: "number",
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
    createInvoiceBillable: {
      name: "create_invoice_billable",
      label: "Creación automática de facturas",
    },
    sendInvoiceToCustomer: {
      name: "send_invoice_to_customer",
      label: "Enviar la factura al cliente por email cuando el gasto se repite",
    },
  },
};

export default form;
