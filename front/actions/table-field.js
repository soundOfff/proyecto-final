"use server";

import { customFetch } from "./custom-fetch";

export async function getTableFields(table, params) {
  const url = new URL(`${process.env.API_URL}/table-fields`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(table),
  });

  return data;
}
