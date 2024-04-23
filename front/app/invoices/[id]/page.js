import Index from "./components/index";
import { show } from "/actions/invoices";

export default async function Show({ params: { id } }) {
  const invoice = await show(id, {
    include: [
      "partner",
      "project.serviceType",
      "currency",
      "estimate",
      "billingCountry",
      "shippingCountry",
      "tags",
      "lineItems.taxes",
    ],
  });

  return <Index invoice={invoice} />;
}
