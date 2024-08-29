"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getSelect() {
  const url = new URL(`${process.env.API_URL}/tasks-select`);

  const { data } = await customFetch(url);

  return data.tasks;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/tasks`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  return data;
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
  revalidatePath("/projects");
  revalidatePath("/invoices");
}

export async function update(taskId, data) {
  const url = new URL(`${process.env.API_URL}/tasks/${taskId}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/tasks");
  revalidatePath("/projects");
  revalidatePath("/partners/tasks");
  revalidatePath("/invoices");
  revalidatePath("/expenses");
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/tasks/${id}`);
  url.search = new URLSearchParams(params);

  const { data: task } = await customFetch(url, { cache: "no-store" });

  return task;
}

export async function destroy(taskId) {
  const url = new URL(`${process.env.API_URL}/tasks/${taskId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/tasks");
  revalidatePath("/projects");
  revalidatePath("/partners/tasks");
  revalidatePath("/invoices");
}

export async function destroyMany(taskIds) {
  const url = new URL(`${process.env.API_URL}/tasks-delete-many`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify({ taskIds: taskIds }),
  });

  revalidatePath("/tasks");
  revalidatePath("/projects");
  revalidatePath("/partners/tasks");
  revalidatePath("/invoices");
}

export async function getCountByStatuses(params) {
  const url = new URL(`${process.env.API_URL}/tasks/counts/status`);
  url.search = new URLSearchParams(params);
  const countByStatuses = await customFetch(url);
  return countByStatuses;
}

export async function getStats(params) {
  const url = new URL(`${process.env.API_URL}/task-stats`);
  url.search = new URLSearchParams(params);
  const data = await customFetch(url);

  return data;
}

export async function editSteps(data) {
  const url = new URL(`${process.env.API_URL}/tasks-edit-steps`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
