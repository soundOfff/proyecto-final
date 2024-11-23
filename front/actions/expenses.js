"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/expenses`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url, { cache: "no-store" });

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/expenses/${id}`);
  url.search = new URLSearchParams(params);

  const { data: partner } = await customFetch(url, { cache: "no-store" });

  return partner;
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/expenses/${id}`);
  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/expenses");
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/expenses`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/expenses");
  redirect("/expenses");
}

export async function destroy(expenseId) {
  const url = new URL(`${process.env.API_URL}/expenses/${expenseId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/expenses");
}

export async function monthlyExpenses(year) {
  const url = new URL(
    `${process.env.API_URL}/monthly-expenses/${parseInt(year)}`
  );
  const data = await customFetch(url, { cache: "no-store" });

  return data;
}

export async function revalidateExpenses(tag = "") {
  revalidateTag(tag);
  revalidatePath("/expenses");
}
