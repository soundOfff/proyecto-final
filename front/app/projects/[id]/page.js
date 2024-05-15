import { show } from "/actions/projects";

import { select as staffSelect } from "/actions/staffs";
import { getTaskStatus, getTaskPriorities } from "/actions/tasks";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllPartners } from "/actions/partners";

import Index from "./components/index";

const include = [
  "staffs",
  "defendant",
  "plaintiff",
  "billingType",
  "process",
  "serviceType",
  "responsiblePerson",
  "status",
  "members",
];

export default async function Show({ params }) {
  const project = await show(params.id, { include });
  const staffs = await staffSelect();
  const statuses = await getTaskStatus();
  const priorities = await getTaskPriorities();
  const repeats = await getAllRepeats();
  const tagsData = await getAllTags();
  const partners = await getAllPartners();

  return (
    <Index
      project={project}
      staffs={staffs}
      statuses={statuses}
      priorities={priorities}
      repeats={repeats}
      tagsData={tagsData}
      partners={partners}
    />
  );
}
