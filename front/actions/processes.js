"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/processes`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/processes/${id}`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url, { cache: "no-store" });

  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/processes`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/processes");
  revalidatePath("/processes/create");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/processes/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/processes");
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/processes/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/processes");
}
