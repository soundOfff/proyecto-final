"use server";

import { customFetch } from "./custom-fetch";
import { revalidatePath } from "next/cache";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/credits`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/credits`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/credit-notes");
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/credits/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/credit-notes");
  revalidatePath("/invoices");
}
