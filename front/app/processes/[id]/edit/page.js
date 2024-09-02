import Form from "../../components/form/form";
import { getAll as getAllProjectServiceTypes } from "/actions/project-service-types";
import { getAll, show } from "/actions/processes";
import { select as selectStaff } from "/actions/staffs";

export default async function CreateProcess({ params: { id } }) {
  const projectServiceTypes = await getAllProjectServiceTypes();
  const process = await show(id, {
    include: ["projectServiceType", "forks", "toNotify"],
  });
  let {
    data: { processes },
  } = await getAll();
  processes = processes.filter((p) => p.id !== process.id);

  const staffData = await selectStaff();

  return (
    <Form
      projectServiceTypes={projectServiceTypes}
      process={process}
      processes={processes}
      staffData={staffData}
    />
  );
}
