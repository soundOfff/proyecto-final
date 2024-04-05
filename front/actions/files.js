"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function destroy(fileId) {
  const url = new URL(`${process.env.API_URL}/files/${fileId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/projects");
}
