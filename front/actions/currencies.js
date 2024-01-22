"use server";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/currencies`);
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

  const { data } = await res.json();

  return data.currencies;
}

export async function getDefaultCurrency() {
  const url = new URL(`${process.env.API_URL}/default-currency`);

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

  const { data: currency } = await res.json();

  return currency;
}
