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
  formId: "new-payment",
  formField: {
    amount: {
      name: "amount",
      label: "Importe recibido *",
      errorMsg: "El monto es requerido",
    },
    expensesAmount: {
      name: "expenses_amount",
      label: "Importe de gastos recibido *",
      errorMsg: "El total de los gastos es requerido",
    },
    paymentMethodId: {
      name: "payment_method_id",
      label: "Metodo de pago *",
      errorMsg: "El metodo de pago es requerido",
    },
    partnerId: {
      name: "partner_id",
      label: "Cliente *",
      errorMsg: "El cliente es requerido",
    },
    date: {
      name: "date",
      label: "Fecha de cobro",
      errorMsg: "La fecha es requerida",
    },
    note: {
      name: "note",
      label: "Nota",
      errorMsg: "La nota es requerida",
    },
    transactionId: {
      name: "transaction_id",
      label: "ID de la transacción",
    },
  },
};

export default form;
