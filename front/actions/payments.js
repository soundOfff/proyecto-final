"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/payments`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/payments`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/payments");
}

export async function destroy(paymentId) {
  const url = new URL(`${process.env.API_URL}/payments/${paymentId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/payments");
}

export async function attach(data) {
  const url = new URL(`${process.env.API_URL}/partial-payments-attach`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/invoices");
}
export async function detach(data) {
  const url = new URL(`${process.env.API_URL}/partial-payments-detach`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/invoices");
}

export default async function paymentsInfo() {
  const url = new URL(`${process.env.API_URL}/payments-info`);

  const data = await customFetch(url);

  return data;
}
