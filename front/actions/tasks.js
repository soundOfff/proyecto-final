"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/tasks`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.tasks;
}

export async function getTaskStatus() {
  const url = new URL(`${process.env.API_URL}/tasks-status`);

  const { data } = await customFetch(url);

  return data.statuses;
}

export async function getTaskPriorities() {
  const url = new URL(`${process.env.API_URL}/tasks-priorities`);

  const { data } = await customFetch(url);

  return data.priorities;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/tasks`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function update(taskId, data) {
  const url = new URL(`${process.env.API_URL}/tasks/${taskId}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/tasks");
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/tasks/${id}`);
  url.search = new URLSearchParams(params);

  const { data: task } = await customFetch(url, { cache: "no-cache" });

  return task;
}

export async function destroy(taskId) {
  const url = new URL(`${process.env.API_URL}/tasks/${taskId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/tasks");
}
