"use server";

import { customFetch } from "./custom-fetch";
import { revalidatePath } from "next/cache";

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/credits`);
  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/credit-notes");
}
