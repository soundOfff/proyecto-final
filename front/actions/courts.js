"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { customFetch } from "./custom-fetch";
import { redirect } from "next/navigation";

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/courts`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/courts");
  redirect("/courts");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/courts/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/courts");
  redirect("/courts");
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/courts`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url, { cache: "no-store" });

  return data.courts;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/courts/${id}`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url, { cache: "no-store" });
  return data;
}

export async function revalidateCourts() {
  revalidateTag("create-court");
  redirect("/courts");
}

export async function destroy(courtId) {
  const url = new URL(`${process.env.API_URL}/courts/${courtId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/courts");
}
