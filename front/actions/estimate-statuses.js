"use server";

import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/estimate-statuses`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.statuses;
}
