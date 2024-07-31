import { show } from "/actions/projects";

import { select as staffSelect } from "/actions/staffs";
import {
  getTaskStatus,
  getTaskPriorities,
  getSelect as getAllDependencies,
} from "/actions/tasks";
import { getAll as getAllTaskableTypes } from "/actions/projects";
import { getAll as getAllRepeats } from "/actions/task-repeats";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllPartners } from "/actions/partners";
import { getAll as getAllActionTypes } from "/actions/action-types";
import { getTableFields } from "/actions/table-field";

import Index from "./components/index";

const include = [
  "staffs",
  "tasks",
  "defendant",
  "tasks",
  "plaintiff",
  "billingType",
  "serviceType.processes.forks",
  "responsiblePerson",
  "status",
  "members",
  "partners",
  "proposal",
];

export default async function Show({ params }) {
  const [
    project,
    staffs,
    tagsData,
    repeats,
    priorities,
    taskableItems,
    statuses,
    partners,
    actionsData,
    tableFields,
    dependencyTasks,
  ] = await Promise.all([
    show(params.id, { include }),
    staffSelect(),
    getAllTags(),
    getAllRepeats(),
    getTaskPriorities(),
    getAllTaskableTypes(),
    getTaskStatus(),
    getAllPartners(),
    getAllActionTypes(),
    getTableFields({ table: "projects" }),
    getAllDependencies(),
  ]);

  return (
    <Index
      project={project}
      staffs={staffs}
      statuses={statuses}
      priorities={priorities}
      repeats={repeats}
      tagsData={tagsData}
      partners={partners}
      taskableItems={taskableItems}
      actionsData={actionsData}
      tableFields={tableFields}
      dependencyTasks={dependencyTasks}
    />
  );
}
