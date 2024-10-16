"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";
import { redirect } from "next/navigation";

export async function select() {
  const url = new URL(`${process.env.API_URL}/staffs-select`);

  const { data } = await customFetch(url);

  return data.staffs;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/staffs`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url, {
    cache: "no-store",
  });

  return data;
}

export async function show(id, params = {}) {
  const url = new URL(`${process.env.API_URL}/staffs/${id}`);
  url.search = new URLSearchParams(params);

  const { data: staff } = await customFetch(url, { cache: "no-store" });

  return staff;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/staffs`);

  await customFetch(url, {
    body: JSON.stringify(data),
    method: "POST",
  });

  revalidatePath("/staffs");
  redirect("/staffs");
}

export async function stats(id) {
  const url = new URL(`${process.env.API_URL}/staffs-stats/${id}`);

  const { data } = await customFetch(url);
  return data;
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/staffs/${id}`);

  await customFetch(url, {
    body: JSON.stringify(data),
    method: "PUT",
  });

  revalidatePath("/staffs");
}

export async function destroy(id) {
  const url = new URL(`${process.env.API_URL}/staffs/${id}`);

  const response = await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/staffs");
  return response;
}

export async function logout(staffId) {
  const url = new URL(`${process.env.API_URL}/logout`);

  const data = await customFetch(url, {
    method: "POST",
    body: JSON.stringify({ staff_id: staffId }),
  });

  return data;
}
