import { getSelect as getPartnerSelect } from "/actions/partners";
import { select as getSelectStaff } from "/actions/staffs";
import { getAll as getAllStatuses } from "/actions/proposal-statuses";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllGroups } from "/actions/groups";
import { getAll as getAllItems } from "/actions/items";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getSelect as getAllCountries } from "/actions/countries";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllItemTypes } from "/actions/line-item-types";
import { getAll as getAllDiscountTypes } from "/actions/discount-types";
import { getDefaultCurrency } from "/actions/currencies";

import Form from "../components/form/form";

export default async function NewEstimate() {
  const [
    partners,
    currencies,
    tags,
    statuses,
    discountTypes,
    staffs,
    countries,
    taxes,
    groupIds,
    items,
    itemTypes,
    defaultCurrency,
  ] = await Promise.all([
    getPartnerSelect(),
    getAllCurrencies(),
    getAllTags(),
    getAllStatuses(),
    getAllDiscountTypes(),
    getSelectStaff(),
    getAllCountries(),
    getAllTaxes(),
    getAllGroups(),
    getAllItems({ include: ["tax", "tax2", "itemGroup"] }),
    getAllItemTypes(),
    getDefaultCurrency(),
  ]);

  return (
    <Form
      {...{
        partners,
        currencies,
        tags,
        statuses,
        discountTypes,
        staffs,
        countries,
        taxes,
        groupIds,
        items,
        itemTypes,
        defaultCurrency,
      }}
    />
  );
}
