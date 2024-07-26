import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllCategories } from "/actions/expense-categories";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getSelect as getSelectInvoices } from "/actions/invoices";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getAll as getAllPaymentMethods } from "/actions/payment-methods";
import Form from "./components/form";

export default async function NewExpense() {
  const [
    partners,
    categories,
    invoices,
    taxes,
    currencies,
    paymentMethods,
    repeats,
  ] = await Promise.all([
    getPartnerSelect(),
    getAllCategories(),
    getSelectInvoices(),
    getAllTaxes(),
    getAllCurrencies(),
    getAllPaymentMethods(),
    getAllRepeats(),
  ]);

  return (
    <Form
      {...{
        partners,
        categories,
        invoices,
        taxes,
        currencies,
        paymentMethods,
        repeats,
      }}
    />
  );
}
