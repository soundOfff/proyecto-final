"use server";

export async function getSelect() {
  const url = new URL(`${process.env.API_URL}/invoices-select`);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.invoices;
}
