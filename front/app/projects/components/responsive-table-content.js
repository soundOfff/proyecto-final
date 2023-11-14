"use client";

import { Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";

export default function ResponsiveTableContent({ props }) {
  return (
    <Grid container spacing={5} width="80vw">
      <Grid item xs={6}>
        <MDTypography variant="body2">Expediente</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.expedient}
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="body2">Nombre</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.name}
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="body2">Cliente</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.responsiblePerson.firstName}
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="body2">Demandante</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.plaintiff.company}
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="body2">Demandado</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.defendant.company}
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="body2">Estado</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.status.label}
      </Grid>
      <Grid item xs={6}>
        <MDTypography variant="body2">Última Nota</MDTypography>
      </Grid>
      <Grid item xs={6}>
        {props.cell.row.original.notes.at(-1).content}
      </Grid>
    </Grid>
  );
}
