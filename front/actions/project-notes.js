"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function attach(formData) {
  const data = {};
  formData.forEach((value, key) => (data[key] = value));

  const url = new URL(
    `${process.env.API_URL}/project-notes/${data.project_id}`
  );

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/projects");
  redirect("/projects");
}
