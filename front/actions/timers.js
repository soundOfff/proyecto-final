"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function store(data) {
  const res = await fetch(`${process.env.API_URL}/timers`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function update(timerId, data) {
  const res = await fetch(`${process.env.API_URL}/timers/${timerId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}
export async function getCurrentTimer(staffId) {
  const url = new URL(`${process.env.API_URL}/current-timer/${staffId}`);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();
  console.log(data);
  return data;
}
