"use server";

async function getSelect() {
  const url = new URL(`${process.env.API_URL}/partners/select`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.partners;
}

async function getAll(params = {}) {
  const url = new URL(`${process.env.API_URL}/partners`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.partners;
}

export { getSelect, getAll };
