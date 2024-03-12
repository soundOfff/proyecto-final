"use server";

import { customFetch } from "./custom-fetch";

export async function getAll() {
  const url = new URL(`${process.env.API_URL}/project-billing-types`);

  const { data } = await customFetch(url);

  return data.billingTypes;
}
