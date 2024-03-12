export async function customFetch(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(`Code: ${response.status}, Error: ${response.statusText}}`);
  }

  return response.json();
}
