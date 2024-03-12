"use server";

import { customFetch } from "./custom-fetch";

export async function getAll() {
  const url = new URL(`${process.env.API_URL}/provinces`);

  const { data } = await customFetch(url);

  return data.provinces;
}
