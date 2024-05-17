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
  formId: "new-credit-note",
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
      label: "Número",
      errorMsg: "Debe ingresar el número",
    },
    date: {
      name: "date",
      label: "Fecha",
      errorMsg: "La fecha desde es requerida",
    },
    currency: {
      name: "currency_id",
      label: "Moneda",
      errorMsg: "Debe seleccionar una Moneda",
    },
    reference: {
      name: "reference_no",
      label: "Referencia",
    },
    discountType: {
      name: "discount_type_id",
      label: "Tipo de descuento",
    },
    billingStreet: {
      name: "billing_street",
      label: "Calle",
      type: "text",
    },
    billingCity: {
      name: "billing_city",
      label: "Localidad",
      type: "text",
    },
    billingState: {
      name: "billing_state",
      label: "Departamento",
      type: "text",
    },
    billingZip: {
      name: "billing_zip",
      label: "Código Postal",
      type: "text",
    },
    billingCountry: {
      name: "billing_country_id",
      label: "País",
    },
    shippingStreet: {
      name: "shipping_street",
      label: "Calle",
      type: "text",
    },
    shippingCity: {
      name: "shipping_city",
      label: "Localidad",
      type: "text",
    },
    shippingState: {
      name: "shipping_state",
      label: "Departamento",
      type: "text",
    },
    shippingZip: {
      name: "shipping_zip",
      label: "Código Postal",
      type: "text",
    },
    shippingCountry: {
      name: "shipping_country_id",
      label: "País",
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
  },
};

export default form;
