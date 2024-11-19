"use server";

import { customFetch } from "./custom-fetch";

export async function getModelRelations(body) {
  const url = new URL(`${process.env.API_URL}/model-relations`);

  const data = await customFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
}
