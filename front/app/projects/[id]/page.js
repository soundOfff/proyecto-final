import { show } from "/actions/projects";

import Index from "./components/index";

const include = [
  "staffs",
  "tasks",
  "billablePartner",
  "tasks",
  "billingType",
  "serviceType.processes.forks",
  "responsiblePerson",
  "status",
  "members",
  "partners",
  "proposal",
  "process",
  "court",
  "notes.staff",
];

export default async function Show({ params }) {
  const project = await show(params.id, { include });

  return <Index project={project} />;
}
