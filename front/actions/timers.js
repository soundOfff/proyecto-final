"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/timers`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function update(timerId, data) {
  const url = new URL(`${process.env.API_URL}/timers/${timerId}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/tasks");
  redirect("/tasks");
}
export async function getCurrentTimer(staffId) {
  const url = new URL(`${process.env.API_URL}/current-timer/${staffId}`);

  const { data } = await customFetch(url, { cache: "no-cache" });

  return data;
}
