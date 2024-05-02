import Index from "./components/index";
import { show } from "/actions/invoices";
import { select as staffSelect } from "/actions/staffs";
import { getTaskStatus, getTaskPriorities } from "/actions/tasks";
import { getAll as getAllRepeats } from "/actions/expense-repeats";
import { getAll as getAllTags } from "/actions/tags";
import { getAll as getAllPartners } from "/actions/partners";

export default async function Show({ params: { id } }) {
  const invoice = await show(id, {
    include: [
      "partner",
      "project.serviceType",
      "project.defendant",
      "currency",
      "estimate",
      "billingCountry",
      "shippingCountry",
      "tags",
      "lineItems.taxes",
      "status",
    ],
  });
  const staffs = await staffSelect();
  const statuses = await getTaskStatus();
  const priorities = await getTaskPriorities();
  const repeats = await getAllRepeats();
  const tagsData = await getAllTags();
  const partners = await getAllPartners();

  return (
    <Index
      invoice={invoice}
      staffs={staffs}
      statuses={statuses}
      priorities={priorities}
      repeats={repeats}
      tagsData={tagsData}
      partners={partners}
    />
  );
}
