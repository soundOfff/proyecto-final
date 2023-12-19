import { show } from "/actions/partners";

export default async function Show({ params: { id } }) {
  const partner = await show(id);
  return <div>{partner.company}</div>;
}
