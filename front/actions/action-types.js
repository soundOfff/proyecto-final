"use server";

import { customFetch } from "./custom-fetch";

export async function getAll(params) {
  const url = new URL(`${process.env.API_URL}/action-types`);
  url.search = new URLSearchParams(params);

  const { data } = await customFetch(url);

  return data.actionTypes;
}

export async function dispatchAction(taskId, actionId) {
  const url = `${process.env.API_URL}/dispatch-action`;
  const response = await customFetch(url, {
    method: "POST",
    body: JSON.stringify({ task_id: taskId, action_id: actionId }),
  });

  return response;
}
