import Index from "./components/index";
import { show } from "/actions/invoices";
import { select as staffSelect } from "/actions/staffs";
import { getTaskStatus, getTaskPriorities } from "/actions/tasks";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllPartners } from "/actions/partners";
import { getSelect as getAllTaskableTypes } from "/actions/invoices";
import { getCurrentTimer } from "/actions/timers";
import { getAll as getAllActionTypes } from "/actions/action-types";
import { getTableFields } from "/actions/table-field";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function Show({ params: { id } }) {
  const session = await getServerSession(authOptions);
  const [
    invoice,
    staffs,
    statuses,
    priorities,
    repeats,
    tagsData,
    partners,
    taskableItems,
    currentTimer,
    actionsData,
    tableFields,
  ] = await Promise.all([
    show(id, {
      include: [
        "partner",
        "project.serviceType",
        "project.billablePartner",
        "project.partners",
        "currency",
        "estimate",
        "billingCountry",
        "shippingCountry",
        "tags",
        "lineItems.taxes",
        "status",
      ],
    }),
    staffSelect(),
    getTaskStatus(),
    getTaskPriorities(),
    getAllRepeats(),
    getAllTags(),
    getAllPartners(),
    getAllTaskableTypes(),
    getCurrentTimer(session.staff.id),
    getAllActionTypes(),
    getTableFields({ table: "projects" }),
  ]);

  return (
    <Index
      invoice={invoice}
      staffs={staffs}
      statuses={statuses}
      priorities={priorities}
      repeats={repeats}
      tagsData={tagsData}
      partners={partners}
      taskableItems={taskableItems}
      currentTimer={currentTimer}
      actionsData={actionsData}
      tableFields={tableFields}
    />
  );
}
