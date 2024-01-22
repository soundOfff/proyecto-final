import { getSelect as getPartnerSelect } from "/actions/partners";
import { select as getStaffSelect } from "/actions/staffs";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllGroups } from "/actions/groups";
import { getAll as getAllItems } from "/actions/items";
import { getAll as getAllServiceTypes } from "/actions/project-service-types";
import { getAll as getAllCurrencies } from "/actions/currencies";
import { getAll as getAllTags } from "/actions/tags";

import Form from "./components/form";

export default async function NewProject() {
  const [
    partners,
    taxes,
    repeats,
    groupIds,
    items,
    serviceTypes,
    agents,
    currencies,
    tags,
  ] = await Promise.all([
    getPartnerSelect(),
    getAllTaxes(),
    getAllRepeats(),
    getAllGroups(),
    getAllItems({ include: ["tax"] }),
    getAllServiceTypes(),
    getStaffSelect(),
    getAllCurrencies(),
    getAllTags(),
  ]);

  return (
    <Form
      {...{
        partners,
        taxes,
        repeats,
        groupIds,
        items,
        serviceTypes,
        agents,
        currencies,
        tags,
      }}
    />
  );
}