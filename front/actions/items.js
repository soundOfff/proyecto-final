"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/items`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.items;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/items`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/estimates/create");
  revalidatePath("/credit-notes/create");
  revalidatePath("/proposals/create");
}
