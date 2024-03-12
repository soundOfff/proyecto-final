"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/expenses`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/expenses/${id}`);
  url.search = new URLSearchParams(params);

  const { data: partner } = await customFetch(url, { cache: "no-store" });

  return partner;
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
