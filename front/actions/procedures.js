"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/procedures`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url, { cache: "no-store" });

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/procedures/${id}`);
  url.search = new URLSearchParams(params);

  const { data: procedure } = await customFetch(url, { cache: "no-store" });

  return procedure;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/procedures`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/procedures");
}

export async function addProcedurePath(data) {
  const url = new URL(`${process.env.API_URL}/procedure-paths`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/procedures/${id}`);
  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/procedures");
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/procedures/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/processes");
}

export async function editSteps(data) {
  const url = new URL(`${process.env.API_URL}/procedures-edit-steps`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
