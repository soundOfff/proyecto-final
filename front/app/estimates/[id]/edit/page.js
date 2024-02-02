import { show as getEstimate } from "/actions/estimates";
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

import Form from "./components/form";

export default async function UpdateEstimate({ params: { id } }) {
  const [
    estimate,
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
  ] = await Promise.all([
    getEstimate(id, {
      include: [
        "partner",
        "lineItems.taxes",
        "currency",
        "project.serviceType",
        "tags",
        "status",
        "subServiceType",
        "discountType",
        "saleAgent",
        "recurring",
      ],
    }),
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
  ]);

  return (
    <Form
      {...{
        estimate,
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
      }}
    />
  );
}
