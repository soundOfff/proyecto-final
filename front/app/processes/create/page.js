import { getAll as getAllProjectServiceTypes } from "/actions/project-service-types";
import Form from "../components/form/form";

export default async function CreateProcess() {
  const projectServiceTypes = await getAllProjectServiceTypes();

  return <Form projectServiceTypes={projectServiceTypes} />;
}
