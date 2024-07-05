"use server";

import { customFetch } from "./custom-fetch";

export async function storeToken(data) {
  const url = new URL(`${process.env.API_URL}/store-token`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
