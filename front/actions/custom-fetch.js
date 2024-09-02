const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function customFetch(url, options = {}) {
  const allOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  const response = await fetch(url, allOptions);

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(
      `Code: ${response.status}, Error: ${response.statusText}, Message: ${error.message}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
