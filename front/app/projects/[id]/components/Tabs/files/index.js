"use client";

import { useDataProvider } from "/providers/DataProvider";
import { Grid } from "@mui/material";
import Table from "./components/table";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Link from "next/link";

export default function Files() {
  const { project } = useDataProvider();
  return (
    <MDBox mb={1}>
      <Grid container spacing={1} p={1}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link
            href={{
              pathname: "/files/create",
              query: { projectId: project.id },
            }}
          >
            <MDButton variant="gradient" color="dark">
              Nuevo Archivo
            </MDButton>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Table project={project} />
        </Grid>
      </Grid>
    </MDBox>
  );
}
