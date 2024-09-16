"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/notes`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.notes;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/notes`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/partners", "layout");
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/notes/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/partners", "layout");
}
