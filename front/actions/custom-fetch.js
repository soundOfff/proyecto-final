"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "/pages/api/auth/[...nextauth]";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function customFetch(url, options = {}) {
  const session = await getServerSession(authOptions);
  const allOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
      ...(session && session.staff
        ? { Authorization: `Bearer ${session.staff.token}` }
        : {}),
    },
  };
  const response = await fetch(url, allOptions);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Code: ${response.status}, Error: ${response.statusText}, Message: ${error.message}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
