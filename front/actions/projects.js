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
  var data = {};
  formData.forEach((value, key) => (data[key] = value));
  data.project_member_ids = data.project_member_ids.split(",");
  var body = JSON.stringify(data);

  console.log(data);

  const request = new Request(`${process.env.API_URL}/projects`, {
    method: "POST",
    body: body,
  });

  const res = await fetch(request);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  console.log(res.status);

  revalidatePath("/projects");

  return {
    redirect: true,
    redirectUri: `/projects`,
    result: [],
    error: null,
  };
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
