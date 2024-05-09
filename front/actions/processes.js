"use server";

import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/processes`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/processes/${id}`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data;
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/processes/${id}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/processes");
}
