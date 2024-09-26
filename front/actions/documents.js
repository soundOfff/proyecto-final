"use server";

export async function generate(projectId, params) {
  const url = new URL(`${process.env.API_URL}/documents`);
  url.search = new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ project_id: projectId }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    if (error.errors) {
      throw new Error(Object.values(error.errors).flat().join("\n"));
    } else {
      throw new Error(
        `Code: ${response.status}, Error: ${response.statusText}, Message: ${error.message}`
      );
    }
  }

  return response.json();
}
