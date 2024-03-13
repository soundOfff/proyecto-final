"use server";

import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/project-statuses?${params}`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.statuses;
}

export async function show(statusId, params) {
  const url = new URL(
    `${process.env.API_URL}/project-statuses/${statusId}?${params}`
  );
  url.search = new URLSearchParams(params);

  const { data: status } = await customFetch(url);

  return status;
}
