import Form from "../../components/form/form";
import { getAll as getAllProjectServiceTypes } from "/actions/project-service-types";
import { show } from "/actions/processes";

export default async function CreateProcess({ params: { id } }) {
  const projectServiceTypes = await getAllProjectServiceTypes();
  const process = await show(id, {
    include: ["projectServiceType", "dependencies"],
  });

  return <Form projectServiceTypes={projectServiceTypes} process={process} />;
}
