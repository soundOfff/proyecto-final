"use client";

import { Divider, FormControl, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import MDInput from "/components/MDInput";
import moment from "moment";
import MDDatePicker from "/components/MDDatePicker";

export default function Filters() {
  const [search, setSearch] = useState(null);
  const [filterDates, setFilterDates] = useState({
    dateFrom: moment().subtract(1, "day").format("YYYY-MM-DD"),
    dateTo: moment().format("YYYY-MM-DD"),
  });

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

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (filterDates.dateFrom) {
      params.set("dateFrom", filterDates.dateFrom);
    } else {
      params.delete("dateFrom");
    }

    if (filterDates.dateTo) {
      params.set("dateTo", filterDates.dateTo);
    } else {
      params.delete("dateTo");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [router, pathname, searchParams, search, filterDates]);

  return (
    <Grid container display="flex" justifyContent="center" mt={2}>
      <Grid item xs={12} sm={4}>
        <FormControl
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "50px",
            display: "flex",
            justifyItems: "end",
          }}
        >
          <MDInput
            label="Buscar"
            placeholder="Ej. Nombre de archivo"
            onChange={handleSearch}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "50px",
            display: "flex",
            justifyItems: "end",
          }}
        >
          <MDDatePicker
            input={{
              fullWidth: true,
              label: "Fecha desde",
            }}
            format="DD/MM/YYYY"
            value={[filterDates.dateFrom]}
            onChange={(value) => {
              setFilterDates({
                ...filterDates,
                dateFrom: moment(value[0]).format("YYYY-MM-DD"),
              });
            }}
          />
        </FormControl>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "50px",
            display: "flex",
            justifyItems: "end",
          }}
        >
          <MDDatePicker
            input={{
              fullWidth: true,
              label: "Fecha hasta",
            }}
            format="DD/MM/YYYY"
            value={[filterDates.dateTo]}
            onChange={(value) => {
              setFilterDates({
                ...filterDates,
                dateTo: moment(value[0]).format("YYYY-MM-DD"),
              });
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
