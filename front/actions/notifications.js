"use server";

import { revalidatePath } from "next/cache";
import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/notifications`);
  url.search = new URLSearchParams(params);

  const data = await customFetch(url);

  revalidatePath("/");

  return data;
}

export async function getAllPriorities() {
  const url = new URL(`${process.env.API_URL}/notification-priorities`);

  const { data } = await customFetch(url);

  return data?.priorities;
}

export async function updateMany(body) {
  const url = new URL(`${process.env.API_URL}/notifications-update-many`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  revalidatePath("/notifications");
}

export async function archiveMany(body) {
  const url = new URL(`${process.env.API_URL}/notifications-archive-many`);

  await customFetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  revalidatePath("/notifications");
}

export async function getIsNotSeenCount(body) {
  const url = new URL(`${process.env.API_URL}/notifications/is-not-seen-count`);

  const response = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return response.count;
}

export async function destroy(notificationId) {
  const url = new URL(`${process.env.API_URL}/notifications/${notificationId}`);

  await customFetch(url, {
    method: "DELETE",
  });

  revalidatePath("/notifications");
}
