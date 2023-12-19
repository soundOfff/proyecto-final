"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function map(data) {
  return {
    ...data,
    is_consolidator: data.isConsolidator,
    consolidator_id: data.consolidator.id,
    phone_number: data.phoneNumber,
    country_id: data.country.id,
  };
}

async function getSelect(params) {
  const url = new URL(`${process.env.API_URL}/partners-select`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.partners;
}

async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/partners`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data.partners;
}

async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/partners/${id}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Code: ${res.status}, Error: ${res.statusText}`);
  }

  const { data: partner } = await res.json();

  return partner;
}

async function update(id, data) {
  const res = await fetch(`${process.env.API_URL}/partners/${id}`, {
    method: "PUT",
    body: JSON.stringify(map(data)),
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

  revalidatePath("/partners");

  redirect("/partners");
}

async function getStats() {
  const url = new URL(`${process.env.API_URL}/partner-stats`);

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

export { getSelect, getAll, show, update, getStats };
