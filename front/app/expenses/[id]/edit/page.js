import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllCategories } from "/actions/expense-categories";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getSelect as getSelectInvoices } from "/actions/invoices";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getAll as getAllPaymentMethods } from "/actions/payment-methods";
import FormComponent from "./components/form";
import { show as getExpense } from "/actions/expenses";

export default async function EditExpense({ params: { id } }) {
  const [
    expense,
    partners,
    categories,
    invoices,
    taxes,
    currencies,
    paymentMethods,
    repeats,
  ] = await Promise.all([
    getExpense(id, {
      include: [
        "partner",
        "task",
        "category",
        "project",
        "files",
        "invoice",
        "paymentMethod",
        "currency",
      ],
    }),
    getPartnerSelect(),
    getAllCategories(),
    getSelectInvoices(),
    getAllTaxes(),
    getAllCurrencies(),
    getAllPaymentMethods(),
    getAllRepeats(),
  ]);

  const apiUrl = process.env.API_URL;

  return (
    <FormComponent
      {...{
        expense,
        partners,
        categories,
        invoices,
        apiUrl,
        taxes,
        currencies,
        paymentMethods,
        repeats,
      }}
    />
  );
}
