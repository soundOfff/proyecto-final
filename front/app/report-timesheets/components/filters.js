"use client";

import {
  Grid,
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import MDInput from "/components/MDInput";
import MDDatePicker from "/components/MDDatePicker";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import moment from "moment";

export default function Filters({ partners, projects, staffs }) {
  const [period, setPeriod] = useState([]);
  const [partner, setPartner] = useState(null);
  const [project, setProject] = useState(null);
  const [staff, setStaff] = useState(null);
  const [myTasks, setMyTasks] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (period.length > 0) {
      params.set(
        "period",
        `${moment(period[0]).format("YYYY-MM-DD")},${moment(period[1]).format(
          "YYYY-MM-DD"
        )}`
      );
    } else {
      params.delete("period");
    }

    if (staff?.id) {
      params.set("staffId", staff.id);
    } else {
      params.delete("staffId");
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
  }, [
    period,
    partner,
    staff,
    project,
    myTasks,
    router,
    pathname,
    searchParams,
  ]);

  return (
    <Grid spacing={4} my={3} sm={12} container>
      <Grid
        item
        margin="auto"
        minWidth={{
          xs: "150px",
          sm: "160px",
          md: "20%",
          paddingBottom: "21px",
        }}
      >
        <MDBox>
          <MDTypography
            variant="body"
            color="secondary"
            sx={{ fontSize: "small" }}
          >
            Fechas
          </MDTypography>
        </MDBox>
        <MDDatePicker
          options={{ mode: "range" }}
          format="YYYY/MM/DD"
          value={period}
          onChange={(dates) => {
            setPeriod(dates);
          }}
          renderInput={(params) => <MDInput {...params} fullWidth />}
        />
      </Grid>
      <Grid
        item
        margin="auto"
        minWidth={{ xs: "150px", sm: "300px", md: "20%" }}
      >
        <Autocomplete
          value={partner}
          options={partners}
          getOptionLabel={(option) => option.mergedName}
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
      <Grid
        item
        margin="auto"
        minWidth={{ xs: "150px", sm: "160px", md: "20%" }}
      >
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
      <Grid
        item
        margin="auto"
        minWidth={{ xs: "150px", sm: "160px", md: "20%" }}
      >
        <Autocomplete
          value={staff}
          options={staffs}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setStaff(value)}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              label="Staff"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid
        item
        margin="auto"
        minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
      >
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
    </Grid>
  );
}
