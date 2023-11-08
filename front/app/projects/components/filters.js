"use client";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MDInput from "/components/MDInput";

export default function Filters({ statuses }) {
  const defaultStatus = { id: 0, label: "Todos" };
  const [status, setStatus] = useState(defaultStatus);

  const [search, setSearch] = useState(null);

  function handleSearch(e) {
    const search = e.target.value;
    if (search.length > 1) {
      setTimeout(() => {
        setSearch(search);
      }, 300);
    } else {
      setSearch(null);
    }
  }

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (status.id) {
      params.set("statusId", status.id);
    } else {
      params.delete("statusId");
    }

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [status, router, pathname, searchParams, search]);

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
        <MDInput label="Buscar" onChange={handleSearch} />
      </FormControl>
    </>
  );
}
