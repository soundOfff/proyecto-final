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
import { show as getProposal } from "/actions/proposals";

import Form from "../../components/form/form";

export default async function UpdateEstimate({ params: { id } }) {
  const [
    proposal,
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
    getProposal(id, {
      include: [
        "currency",
        "discountType",
        "tags",
        "lineItems.taxes",
        "proposable",
      ],
    }),
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
        proposal,
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
