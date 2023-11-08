"use server";

import { revalidatePath } from "next/cache";

async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/projects`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.projects;
}

async function getOne(projectId, params) {
  const url = new URL(`${process.env.API_URL}/projects/${projectId}?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data: project } = await res.json();

  return project;
}

async function getCountByStatuses() {
  const url = new URL(`${process.env.API_URL}/projects/counts/status`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const countByStatuses = await res.json();

  return countByStatuses;
}

async function store(formData) {
  const url = new URL(`${process.env.API_URL}/projects/counts/status`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const countByStatuses = await res.json();

  revalidatePath("/projects");

  return countByStatuses;
}

async function destroy(projectId) {
  const url = new URL(`${process.env.API_URL}/projects/${projectId}`);
}

export { getAll, getOne, store, getCountByStatuses };
