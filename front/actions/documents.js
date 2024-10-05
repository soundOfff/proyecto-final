"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export async function generate(projectId, params) {
  const session = await getServerSession(authOptions);
  const url = new URL(`${process.env.API_URL}/documents`);
  url.search = new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(session && session.staff
        ? { Authorization: `Bearer ${session.staff.token}` }
        : {}),
    },
    method: "POST",
    body: JSON.stringify({ project_id: projectId }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    if (error.errors) {
      return {
        errors: Object.values(error.errors).flat(),
        data: null,
      };
    } else {
      return {
        errors: [error.message.split("Message: ")[1] || error.message],
        data: null,
      };
    }
  }
  const data = await response.json();

  return { errors: null, data: data.url };
}
