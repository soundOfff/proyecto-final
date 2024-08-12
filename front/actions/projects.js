"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getSelect(partnerId, params) {
  const url = new URL(`${process.env.API_URL}/projects-select/${partnerId}}`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url, { cache: "no-store" });

  return data.projects;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/projects`);
  url.search = new URLSearchParams(params);
  const { data } = await customFetch(url);
  return data.projects;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/projects/${id}`);
  url.search = new URLSearchParams(params);

  const { data: project } = await customFetch(url, { cache: "no-store" });

  return project;
}

export async function getCountByStatuses(params) {
  const url = new URL(`${process.env.API_URL}/projects/counts/status`);
  url.search = new URLSearchParams(params);
  const countByStatuses = await customFetch(url);
  return countByStatuses;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/projects`);

  await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/projects");
  redirect("/projects");
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/projects/${id}`);
  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/projects");
}

export async function attachTasks(params) {
  const { projectId, processId, staffId } = params;
  const url = new URL(
    `${process.env.API_URL}/projects/${projectId}/tasks-attach`
  );

  const data = await customFetch(url, {
    method: "POST",
    body: JSON.stringify({ processId, staffId }),
  });

  revalidatePath("/projects");
  revalidatePath("/tasks");

  return data;
}

export async function updateMembers(id, data) {
  const url = new URL(`${process.env.API_URL}/project-members/${id}`);
  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/projects");
  redirect("/projects");
}

export async function destroy(projectId) {
  const url = new URL(`${process.env.API_URL}/projects/${projectId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/projects");
}
