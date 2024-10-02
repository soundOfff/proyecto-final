"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customFetch } from "./custom-fetch";

export async function getSelect(params) {
  const url = new URL(`${process.env.API_URL}/partners-select`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url, { cache: "no-store" });

  return data.partners;
}

export async function getAllSections() {
  const url = new URL(`${process.env.API_URL}/partner-sections`);

  const { data } = await customFetch(url);

  return data.sections;
}

export async function getAllIndustries() {
  const url = new URL(`${process.env.API_URL}/partner-industries`);

  const { data } = await customFetch(url);

  return data.industries;
}

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/partners`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.partners;
}

export async function show(id, params) {
  const url = new URL(`${process.env.API_URL}/partners/${id}`);
  url.search = new URLSearchParams(params);

  const { data: partner } = await customFetch(url, { cache: "no-store" });

  return partner;
}

export async function store(data) {
  const url = new URL(`${process.env.API_URL}/partners`);

  const partner = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath("/partners");
  revalidatePath("/partners/create");

  return partner;
}

export async function update(id, data) {
  const url = new URL(`${process.env.API_URL}/partners/${id}`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getStats() {
  const url = new URL(`${process.env.API_URL}/partner-stats`);

  const data = await customFetch(url);

  return data;
}
