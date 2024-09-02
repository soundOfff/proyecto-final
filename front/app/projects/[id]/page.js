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
import { getAllPriorities } from "/actions/notifications";

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
];

export default async function Show({ params }) {
  const [
    project,
    staffs,
    tagsData,
    repeats,
    priorities,
    {
      data: { projects: taskableItems },
    },
    statuses,
    partners,
    actionsData,
    tableFields,
    dependencyTasks,
    notificationPriorities,
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
    getAllPriorities(),
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
      notificationPriorities={notificationPriorities}
    />
  );
}
