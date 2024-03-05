"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/tasks`);
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

  const data = await res.json();
  console.log(data);

  return data;
}

export async function getTaskStatus() {
  const url = new URL(`${process.env.API_URL}/tasks-status`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }
  const { data } = await res.json();
  return data?.statuses;
}

export async function getTaskPriorities() {
  const url = new URL(`${process.env.API_URL}/tasks-priorities`);
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }
  const { data } = await res.json();
  return data?.priorities;
}

export async function store(data) {
  console.log(data);
  const res = await fetch(`${process.env.API_URL}/tasks`, {
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

export async function update(taskId, data) {
  const res = await fetch(`${process.env.API_URL}/tasks/${taskId}`, {
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
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/tasks/${id}`);
  url.search = new URLSearchParams(params);

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

  const { data: task } = await res.json();

  return task;
}

export async function destroy(taskId) {
  const request = new Request(`${process.env.API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/tasks");
}
