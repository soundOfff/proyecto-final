import { show } from "/actions/projects";

import { select as staffSelect } from "/actions/staffs";
import { getTaskStatus, getTaskPriorities } from "/actions/tasks";
import Index from "./components/index";

const include = [
  "staffs",
  "defendant",
  "plaintiff",
  "billingType",
  "serviceType",
  "status",
  "members",
];

export default async function Show({ params }) {
  const project = await show(params.id, { include });
  const staffs = await staffSelect();
  const statuses = await getTaskStatus();
  const priorities = await getTaskPriorities();

  return (
    <Index
      project={project}
      staffs={staffs}
      statuses={statuses}
      priorities={priorities}
    />
  );
}
