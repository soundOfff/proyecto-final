"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/notifications`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  revalidatePath("/");

  return data;
}

export async function getIsNotSeenCount(body) {
  const url = new URL(`${process.env.API_URL}/notifications/is-not-seen-count`);

  const response = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return response.count;
}
