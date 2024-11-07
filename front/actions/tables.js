"use server";

import { customFetch } from "./custom-fetch";

export async function getTables(params) {
  const url = new URL(`${process.env.API_URL}/tables`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}
