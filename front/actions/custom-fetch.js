const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function customFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(`Code: ${response.status}, Error: ${response.statusText}}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
