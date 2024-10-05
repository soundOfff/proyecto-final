"use server";

import { customFetch } from "./custom-fetch";

export async function getSelect() {
  const url = new URL(`${process.env.API_URL}/countries-select`);

  const { data } = await customFetch(url);

  return data.countries;
}
