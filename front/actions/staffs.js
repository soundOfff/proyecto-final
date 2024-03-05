"use server";

export async function select() {
  const url = new URL(`${process.env.API_URL}/staffs-select`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.staffs;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/staffs`);
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

  return data.staffs;
}
