"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/estimates`);
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

  return data.estimates;
}

export async function store(data) {
  const res = await fetch(`${process.env.API_URL}/estimates`, {
    method: "POST",
    body: JSON.stringify(data),
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

  revalidatePath("/estimates");

  redirect("/estimates");
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/estimates/${id}`);
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

  const { data: estimate } = await res.json();

  return estimate;
}

export async function toInvoice(estimateId, params) {
  const url = new URL(
    `${process.env.API_URL}/estimates-to-invoice/${estimateId}`
  );
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

  const invoiceId = await res.json();

  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/estimates/${estimateId}`);

  redirect(`/invoices/${invoiceId}`);
}

export async function getMaxId() {
  const url = new URL(`${process.env.API_URL}/estimates-max-id`);

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

  const maxId = await res.json();

  return maxId;
}
