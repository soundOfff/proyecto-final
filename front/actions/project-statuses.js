"use server";

async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/project-statuses?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.statuses;
}

async function show(statusId, params) {
  const url = new URL(
    `${process.env.API_URL}/project-statuses/${statusId}?${params}`
  );
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data: status } = await res.json();

  return status;
}

export { getAll, show };
