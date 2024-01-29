import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllCategories } from "/actions/expense-categories";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getAll as getAllPaymentMethods } from "/actions/payment-methods";
import { show as showProject } from "/actions/projects";
import Form from "./components/form";

export default async function NewProject({ params: { id } }) {
  const [
    projectSelected,
    partners,
    categories,
    taxes,
    currencies,
    paymentMethods,
  ] = await Promise.all([
    showProject(id, { include: ["defendant"] }),
    getPartnerSelect(),
    getAllCategories(),
    getAllTaxes(),
    getAllCurrencies(),
    getAllPaymentMethods(),
  ]);

  return (
    <Form
      {...{
        projectSelected,
        partners,
        categories,
        taxes,
        currencies,
        paymentMethods,
      }}
    />
  );
}
