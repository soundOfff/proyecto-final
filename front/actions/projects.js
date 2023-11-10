"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const data = {};
  formData.forEach((value, key) => (data[key] = value));
  data.project_member_ids = data.project_member_ids.split(",");

  const res = await fetch(`${process.env.API_URL}/projects`, {
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
  revalidatePath("/projects");

  redirect("/projects");
}

async function destroy(projectId) {
  const request = new Request(`${process.env.API_URL}/projects/${projectId}`, {
    method: "DELETE",
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/projects");
}

export { getAll, getOne, store, destroy, getCountByStatuses };
