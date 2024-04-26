"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";
import { redirect } from "next/navigation";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/credit-notes`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/credit-notes`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/credit-notes");
  redirect("/credit-notes");
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/credit-notes/${id}`);
  url.search = new URLSearchParams(params);

  const { data: creditNote } = await customFetch(url, { cache: "no-store" });

  return creditNote;
}
