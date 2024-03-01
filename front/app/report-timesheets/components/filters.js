"use client";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Grid,
  Select,
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { PERIODS } from "/utils/constants/periodFilterTypes";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Filters({ partners, projects }) {
  const [period, setPeriod] = useState(PERIODS[0]);
  const [partner, setPartner] = useState(null);
  const [project, setProject] = useState(null);
  const [myTasks, setMyTasks] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (period?.value) {
      params.set("period", period.value);
    } else {
      params.delete("period");
    }

    if (partner?.id) {
      params.set("partnerId", partner.id);
    } else {
      params.delete("partnerId");
    }

    if (project?.id) {
      params.set("projectId", project.id);
    } else {
      params.delete("projectId");
    }

    if (myTasks) {
      params.set("myTasks", "true");
    } else {
      params.delete("myTasks");
    }

    const queryParams = params.toString();
    const query = queryParams ? `?${queryParams}` : "";

    router.push(`${pathname}${query}`);
  }, [period, partner, project, myTasks, router, pathname, searchParams]);

  return (
    <Grid
      container
      spacing={4}
      my={3}
      sm={12}
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Grid item xs={12} sm={3}>
        <FormControl
          sx={{
            width: { xs: "100%" },
            height: "45px",
            mb: 3,
          }}
        >
          <InputLabel id="status">Periodo</InputLabel>
          <Select
            labelId="status"
            label="Estado"
            value={period.label}
            sx={{ height: "100%" }}
          >
            {PERIODS.map((p) => (
              <MenuItem
                key={p.value}
                value={p.label}
                onClick={() => setPeriod(p)}
              >
                {p.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Autocomplete
          value={partner}
          options={partners}
          getOptionLabel={(option) => option.company}
          onChange={(_, value) => setPartner(value)}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Clientes"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Autocomplete
          value={project}
          options={projects}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setProject(value)}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Casos"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item sm={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={myTasks}
                onChange={(_, value) => setMyTasks(value)}
              />
            }
            label="Mis tareas"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={1}>
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => handleFilter()}
          sx={{ mr: 2, displayPrint: "none" }}
        >
          Filtrar
        </MDButton>
      </Grid>
    </Grid>
  );
}
