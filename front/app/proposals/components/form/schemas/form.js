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
    subject: {
      name: "subject",
      label: "Tema",
      errorMsg: "Debe ingresar un tema",
    },
    date: {
      name: "date",
      label: "Fecha",
      errorMsg: "Debe ingresar un numero de proforma",
    },
    openTill: {
      name: "open_till",
      label: "Válida Hasta",
      errorMsg: "La fecha desde es requerida",
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
    discountType: {
      name: "discount_type_id",
      label: "Tipo de descuento",
    },
    allowComments: {
      name: "allow_comments",
      label: "Permitir comentarios",
    },
    status: {
      name: "proposal_status_id",
      label: "Estado",
      errorMsg: "Debe seleccionar un estado",
    },
    staffAssigned: {
      name: "staff_assigned_id",
      label: "Abogado Principal",
      errorMsg: "Debe seleccionar un abogado principal",
    },
    proposalTo: {
      name: "proposal_to",
      label: "Para",
      errorMsg: "Debe seleccionar para quién es la propuesta",
    },
    address: {
      name: "address",
      label: "Dirección",
    },
    city: {
      name: "city",
      label: "Localidad",
    },
    state: {
      name: "state",
      label: "Departamento",
      type: "text",
    },
    zip: {
      name: "zip",
      label: "Código Postal",
      type: "text",
    },
    phone: {
      name: "phone",
      label: "Teléfono",
      type: "text",
    },
    email: {
      name: "email",
      label: "Email",
      type: "text",
      errorMsg: "El email es requerido",
    },
    contact: {
      name: "contact_id",
      label: "Contacto",
      errorMsg: "Debe seleccionar un contacto",
    },
    country: {
      name: "country_id",
      label: "País",
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
