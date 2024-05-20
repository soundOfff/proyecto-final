import { redirect } from "next/navigation";

export default async function Show({ params: { id } }) {
  redirect(`/partners/${id}/profile`);
}
