"use server";

import { customFetch } from "./custom-fetch";
import { revalidatePath } from "next/cache";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/request-templates`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/request-templates/${id}`);
  url.search = new URLSearchParams(params);

  const { data: requestTemplate } = await customFetch(url);

  return requestTemplate;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/request-templates`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/", "layout");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/request-templates/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/", "layout");
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/request-templates/${id}`);

  const response = await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/", "layout");

  return response;
}
