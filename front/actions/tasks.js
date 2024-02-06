"use server";
// TODO: make the endpoints
export async function getAll(params) {
  return {
    data: {
      tasks: [],
    },
    meta: {},
  };
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

  return data;
}

export async function getCountByStatuses(params) {
  return [];
  const url = new URL(`${process.env.API_URL}/tasks/counts/status`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const countByStatuses = await res.json();

  return countByStatuses;
}

export async function getStatuses(params) {
  return [];
  const url = new URL(`${process.env.API_URL}/tasks/statuses`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const statuses = await res.json();

  return statuses;
}
