import Form from "../../components/form/form";
import { getAll as getAllProjectServiceTypes } from "/actions/project-service-types";
import { getAll, show } from "/actions/processes";

export default async function CreateProcess({ params: { id } }) {
  const projectServiceTypes = await getAllProjectServiceTypes();
  const process = await show(id, {
    include: ["projectServiceType", "forks"],
  });
  let {
    data: { processes },
  } = await getAll();
  processes = processes.filter((p) => p.id !== process.id);

  return (
    <Form
      projectServiceTypes={projectServiceTypes}
      process={process}
      processes={processes}
    />
  );
}
