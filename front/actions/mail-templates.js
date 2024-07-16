"use server";
import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";
import { redirect } from "next/navigation";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/mail-templates`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.templates;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/mail-templates/${id}`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data;
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/mail-templates/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/mail-templates");
}

export async function allowedFields(body) {
  const url = new URL(`${process.env.API_URL}/mail-templates-allowed-fields`);

  const data = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
}
