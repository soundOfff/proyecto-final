"use client";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MDInput from "/components/MDInput";

import { useCreateQueryParams } from "/hooks/useCreateQueryString";

export default function Filters({ statuses }) {
  const defaultStatus = { id: 0, label: "Todos" };
  const [status, setStatus] = useState(defaultStatus);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCreateQueryParams(searchParams);

  useEffect(() => {
    if (status.id !== 0) {
      router.replace(pathname + "?" + createQueryString("statusId", status.id));
    } else {
      router.replace(pathname);
    }
  }, [status, router, pathname, searchParams, createQueryString]);

  return (
    <>
      <FormControl sx={{ width: "30%" }}>
        <InputLabel id="status">Estado</InputLabel>
        <Select labelId="status" value={status.label} sx={{ height: "100%" }}>
          <MenuItem
            key="all"
            value="Todos"
            onClick={() => setStatus(defaultStatus)}
          >
            Todos
          </MenuItem>
          {statuses.map((status) => (
            <MenuItem
              key={status.id}
              value={status.label}
              onClick={() => setStatus(status)}
            >
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "30%" }}>
        <MDInput label="Buscar" />
      </FormControl>
    </>
  );
}
