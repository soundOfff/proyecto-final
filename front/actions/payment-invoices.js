"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/payment-invoices`);
  url.search = new URLSearchParams(params);
  const data = await customFetch(url);
  return data;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/payment-invoices`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/payments");
}
