"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/estimates`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/estimates`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/estimates");
  redirect("/estimates");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/estimates/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/estimates");
  redirect("/estimates");
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/estimates/${id}`);
  url.search = new URLSearchParams(params);

  const { data: estimate } = await customFetch(url, { cache: "no-store" });

  return estimate;
}

export async function toInvoice(estimateId, params) {
  const url = new URL(
    `${process.env.API_URL}/estimates-to-invoice/${estimateId}`
  );
  url.search = new URLSearchParams(params);

  const invoiceId = await customFetch(url);

  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/estimates/${estimateId}`);
  redirect(`/invoices/${invoiceId}`);
}

export async function getMaxId() {
  const url = new URL(`${process.env.API_URL}/estimates-max-id`);

  const maxId = await customFetch(url);

  return maxId;
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/estimates/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/estimates");
}
