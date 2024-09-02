"use server";

import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/currencies`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.currencies;
}

export async function getDefaultCurrency() {
  const url = new URL(`${process.env.API_URL}/default-currency`);

  const { data: currency } = await customFetch(url);

  return currency;
}
