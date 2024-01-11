import { getSelect as getPartnerSelect } from "/actions/partners";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getAll as getAllTaxes } from "/actions/taxes";
import { getAll as getAllGroups } from "/actions/groups";
import { getAll as getAllItems } from "/actions/items";

import Form from "./components/form";

export default async function NewProject() {
  const [partners, taxes, repeats, groupIds, items] = await Promise.all([
    getPartnerSelect(),
    getAllTaxes(),
    getAllRepeats(),
    getAllGroups(),
    getAllItems(),
  ]);

  return (
    <Form
      {...{
        partners,
        taxes,
        repeats,
        groupIds,
        items,
      }}
    />
  );
}
