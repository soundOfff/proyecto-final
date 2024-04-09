"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/files`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
}

export async function destroy(fileId) {
  const url = new URL(`${process.env.API_URL}/files/${fileId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/projects");
}
