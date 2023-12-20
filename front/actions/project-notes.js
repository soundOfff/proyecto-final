"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function attach(formData) {
  const data = {};
  formData.forEach((value, key) => (data[key] = value));

  const res = await fetch(
    `${process.env.API_URL}/project-notes/${data.project_id}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/projects");

  redirect("/projects");
}
