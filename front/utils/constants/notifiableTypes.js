export const MAPPED_NOTIFIABLE_TYPES = {
  project: { label: "Caso", url: "/projects/", key: "name" },
  invoice: { label: "Factura", url: "/invoices/", key: "number" },
  customer: { label: "Cliente", url: "/partners/", key: "merged_name" },
  expense: { label: "Gasto", url: "/expenses/", key: "name" },
  task: { label: "Tarea", url: "/tasks?taskId=", key: "name" },
};

// todo: if needed some change refactor
export const NOTIFICATION_PRIORITIES = [
  { id: 1, name: "low", label: "Bajo" },
  { id: 2, name: "mid", label: "Medio" },
  { id: 3, name: "high", label: "Alto" },
  { id: 4, name: "urgent", label: "Urgente" },
];
