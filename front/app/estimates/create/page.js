import { getSelect as getPartnerSelect } from "/actions/partners";
import { select as getStaffSelect } from "/actions/staffs";
import { getAll as getAllRecurrings } from "/actions/recurrings";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllGroups } from "/actions/groups";
import { getAll as getAllItems } from "/actions/items";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllStatuses } from "/actions/estimate-statuses";
import { getAll as getAllItemTypes } from "/actions/line-item-types";
import { getAll as getAllDiscountTypes } from "/actions/discount-types";
import { getAll as getAllSubServiceTypes } from "/actions/sub-service-types";
import { getMaxId as getMaxEstimateId } from "/actions/estimates";
import { getDefaultCurrency } from "/actions/currencies";

import Form from "./components/form";

export default async function NewEstimate() {
  const [
    partners,
    taxes,
    recurrings,
    groupIds,
    items,
    serviceTypes,
    agents,
    currencies,
    tags,
    statuses,
    itemTypes,
    discountTypes,
    subServiceTypes,
    maxEstimateId,
    defaultCurrency,
  ] = await Promise.all([
    getPartnerSelect(),
    getAllTaxes(),
    getAllRecurrings(),
    getAllGroups(),
    getAllItems({ include: ["tax", "itemGroup"] }),
    getAllServiceTypes(),
    getStaffSelect(),
    getAllCurrencies(),
    getAllTags(),
    getAllStatuses(),
    getAllItemTypes(),
    getAllDiscountTypes(),
    getAllSubServiceTypes(),
    getMaxEstimateId(),
    getDefaultCurrency(),
  ]);

  return (
    <Form
      {...{
        partners,
        taxes,
        recurrings,
        groupIds,
        items,
        serviceTypes,
        agents,
        currencies,
        tags,
        statuses,
        itemTypes,
        discountTypes,
        subServiceTypes,
        maxEstimateId,
        defaultCurrency,
      }}
    />
  );
}
