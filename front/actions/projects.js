"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSelect(partnerId, params) {
  const url = new URL(`${process.env.API_URL}/projects-select/${partnerId}}`);
  url.search = new URLSearchParams(params);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(data);
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.projects;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/projects`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.projects;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/projects/${id}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data: project } = await res.json();

  return project;
}

export async function getCountByStatuses(params) {
  const url = new URL(`${process.env.API_URL}/projects/counts/status`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const countByStatuses = await res.json();

  return countByStatuses;
}

export async function store(data) {
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

export async function destroy(projectId) {
  const request = new Request(`${process.env.API_URL}/projects/${projectId}`, {
    method: "DELETE",
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  revalidatePath("/projects");
}
