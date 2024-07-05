"use server";

import { customFetch } from "./custom-fetch";

export async function generate(params) {
  const url = new URL(`${process.env.API_URL}/documents`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}
