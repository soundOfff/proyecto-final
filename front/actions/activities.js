import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/activity-logs`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url, { cache: "no-cache" });

  return data.activities;
}
