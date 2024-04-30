import { show } from "/actions/credit-notes";
import Index from "./components/index";

export default async function Show({ params: { id } }) {
  const creditNote = await show(id, {
    include: ["lineItems.taxes", "partner", "project"],
  });

  return <Index creditNote={creditNote} />;
}
