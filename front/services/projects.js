async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/projects?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  const { data } = await res.json();

  return data.projects;
}

export { getAll };
