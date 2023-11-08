async function getAll() {
  const url = new URL(`${process.env.API_URL}/project-service-types`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.serviceTypes;
}

export { getAll };
