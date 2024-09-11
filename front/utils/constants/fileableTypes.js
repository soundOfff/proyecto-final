export const FILEABLE_TYPES = [
  { label: "Caso", value: "project" },
  { label: "Cliente", value: "customer" },
  { label: "Gasto", value: "expense" },
  { label: "Tarea", value: "task" },
];

export const MAPPED_FILEABLE_TYPES = {
  project: { label: "Caso", url: "/projects/", key: "name" },
  customer: { label: "Cliente", url: "/partners/", key: "merged_name" },
  expense: { label: "Gasto", url: "/expenses/", key: "name" },
  task: { label: "Tarea", url: "/tasks", key: "name" },
};

export const PROJECT_FILEABLE_TYPE = "project";
export const PARTNER_FILEABLE_TYPE = "customer";
export const EXPENSE_FILEABLE_TYPE = "expense";
export const TASK_FILEABLE_TYPE = "task";
