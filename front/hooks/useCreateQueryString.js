import { useCallback } from "react";

export function useCreateQueryParams(searchParams) {
  return useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
}
