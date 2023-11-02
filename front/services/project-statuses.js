async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/project-statuses?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  const { data } = await res.json();

  return data.statuses;
}

async function getOne(statusId, params) {
  const url = new URL(
    `${process.env.API_URL}/project-statuses/${statusId}?${params}`
  );
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  const { data: status } = await res.json();

  return status;
}

export { getAll, getOne };
