"use server";

import { customFetch } from "./custom-fetch";

export async function getStats() {
  const url = new URL(`${process.env.API_URL}/contact-stats`);

  const data = await customFetch(url);

  return data;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/contacts`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.contacts;
}
