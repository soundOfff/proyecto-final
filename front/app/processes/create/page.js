import { getAll as getAllProjectServiceTypes } from "/actions/project-service-types";
import Form from "../components/form/form";
import { getAll } from "/actions/processes";
import { select as selectStaff } from "/actions/staffs";

export default async function CreateProcess() {
  const projectServiceTypes = await getAllProjectServiceTypes();
  const {
    data: { processes },
  } = await getAll({
    include: "projectServiceType",
  });
  const staffData = await selectStaff();
  return (
    <Form
      projectServiceTypes={projectServiceTypes}
      processes={processes}
      staffData={staffData}
    />
  );
}
