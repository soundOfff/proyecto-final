"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";
import { redirect } from "next/navigation";

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/procedures`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/processes");
  redirect("/processes");
}
