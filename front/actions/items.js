"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/items`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data);
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.items;
}

export async function store(data) {
  const res = await fetch(`${process.env.API_URL}/items`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const data = await res.json();

    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/pro-forms/create");

  redirect("/pro-forms/create");
}
