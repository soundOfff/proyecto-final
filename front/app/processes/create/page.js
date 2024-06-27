import { getAll as getAllProjectServiceTypes } from "/actions/project-service-types";
import Form from "../components/form/form";
import { getAll } from "/actions/processes";

export default async function CreateProcess() {
  const projectServiceTypes = await getAllProjectServiceTypes();
  const {
    data: { processes },
  } = await getAll();

  return (
    <Form projectServiceTypes={projectServiceTypes} processes={processes} />
  );
}
