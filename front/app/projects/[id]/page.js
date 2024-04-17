import { show } from "/actions/projects";

import { select as staffSelect } from "/actions/staffs";
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

  return <Index project={project} staffs={staffs} />;
}
