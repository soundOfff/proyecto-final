"use server";

async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/projects?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch, received status ${res.status}`);
  }

  const { data } = await res.json();

  return data.projects;
}

async function getOne(projectId, params) {
  const url = new URL(`${process.env.API_URL}/projects/${projectId}?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch, received status ${res.status}`);
  }

  const { data: project } = await res.json();

  return project;
}

export { getAll, getOne };
