"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { customFetch } from "./custom-fetch";
import { redirect } from "next/navigation";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/files`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url, { cache: "no-store" });

  return data;
}

export async function revalidateFiles() {
  revalidateTag("create-file");
  redirect("/files");
}

export async function destroy(fileId) {
  const url = new URL(`${process.env.API_URL}/files/${fileId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/projects");
  revalidatePath("/expenses");
}
