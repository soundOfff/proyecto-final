export async function getStats() {
  const url = new URL(`${process.env.API_URL}/contact-stats`);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/contacts`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.contacts;
}
