"use server";

import { customFetch } from "./custom-fetch";

export async function getSelect() {
  const url = new URL(`${process.env.API_URL}/invoices-select`);

  const { data } = await customFetch(url, { cache: "no-store" });

  return data.invoices;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/invoices`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/invoices/${id}`);
  url.search = new URLSearchParams(params);

  const { data: invoice } = await customFetch(url);

  return invoice;
}
