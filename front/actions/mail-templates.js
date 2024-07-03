"use server";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/mail-templates`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.templates;
}
