"use client";

import { InputLabel, MenuItem, FormControl, Select, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import { useMaterialUIController } from "/context";
import Link from "next/link";

export default function Filters({ statuses }) {
  const defaultStatus = { id: 0, label: "Todos" };
  const [status, setStatus] = useState(defaultStatus);

  const [search, setSearch] = useState(null);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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
    <Grid container spacing={3} my={1}>
      <Grid item xs={12} sm={4}>
        <FormControl
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "45px",
            mb: 2,
          }}
        >
          <InputLabel id="status">Estado</InputLabel>
          <Select
            labelId="status"
            label="Estado"
            value={status.label}
            sx={{ height: "100%" }}
          >
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
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "50px",
            mb: 2,
            display: "flex",
            justifyItems: "end",
          }}
        >
          <MDInput label="Buscar" onChange={handleSearch} />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Link
          href={{
            pathname: "/projects/create",
          }}
        >
          <MDButton variant="gradient" color={darkMode ? "light" : "dark"}>
            Nuevo Caso
          </MDButton>
        </Link>
      </Grid>
    </Grid>
  );
}
