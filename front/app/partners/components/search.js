"use client";

import { FormControl, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState(null);

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.length > 1) {
      setTimeout(() => {
        setSearch(search);
      }, 300);
    } else {
      setSearch(null);
    }
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [router, pathname, searchParams, search]);

  return (
    <MDBox my={2}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: "50%" }}>
            <MDInput label="Buscar" ml={5} onChange={handleSearch} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MDBox display="flex" justifyContent="end">
            <Link href="/partners/create">
              <MDButton variant="gradient" color="dark">
                Nuevo Cliente
              </MDButton>
            </Link>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
