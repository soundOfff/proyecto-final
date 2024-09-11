"use server";

import { customFetch } from "./custom-fetch";
import { revalidatePath } from "next/cache";

export async function getStats() {
  const url = new URL(`${process.env.API_URL}/contact-stats`);

  const data = await customFetch(url);

  return data;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/contacts`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.contacts;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/contacts/${id}`);
  url.search = new URLSearchParams(params);

  const { data: contact } = await customFetch(url);

  return contact;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/contacts`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/partners", "layout");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/contacts/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/partners", "layout");
}
