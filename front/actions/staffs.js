"use server";

import { customFetch } from "./custom-fetch";

export async function select() {
  const url = new URL(`${process.env.API_URL}/staffs-select`);

  const { data } = await customFetch(url);

  return data.staffs;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/staffs`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data.staffs;
}
