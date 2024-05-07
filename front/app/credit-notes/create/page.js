import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllGroups } from "/actions/groups";
import { getAll as getAllItems } from "/actions/items";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getAll as getAllItemTypes } from "/actions/line-item-types";
import { getAll as getAllDiscountTypes } from "/actions/discount-types";
import { getDefaultCurrency } from "/actions/currencies";
import { getSelect as getSelectCountries } from "/actions/countries";

import Form from "./components/form";

export default async function NewEstimate() {
  const [
    partners,
    taxes,
    groupIds,
    items,
    currencies,
    itemTypes,
    discountTypes,
    defaultCurrency,
    countries,
  ] = await Promise.all([
    getPartnerSelect(),
    getAllTaxes(),
    getAllGroups(),
    getAllItems({ include: ["tax", "tax2", "itemGroup"] }),
    getAllCurrencies(),
    getAllItemTypes(),
    getAllDiscountTypes(),
    getDefaultCurrency(),
    getSelectCountries(),
  ]);

  return (
    <Form
      {...{
        partners,
        taxes,
        groupIds,
        items,
        currencies,
        itemTypes,
        discountTypes,
        defaultCurrency,
        countries,
      }}
    />
  );
}
