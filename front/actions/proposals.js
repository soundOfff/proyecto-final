"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/proposals`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/proposals`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/proposals");
  redirect("/proposals");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/proposals/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/proposals");
  redirect("/proposals");
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/proposals/${id}`);
  url.search = new URLSearchParams(params);

  const { data: proposal } = await customFetch(url, { cache: "no-store" });

  return proposal;
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/proposals/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/proposals");
}
