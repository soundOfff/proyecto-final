"use client";

import { Card, FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import PersonForm from "./person-form";
import JuridicalForm from "./juridical-form";

export default function DetailFormComponent({
  consolidators,
  countries,
  notJuridicEntities,
  sections,
  industries,
  partnerTypes,
  errors,
  values,
  touched,
  setFieldValue,
  isJuridic,
  setIsJuridic,
  isRequired,
  setIsRequired,
}) {
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <Grid container spacing={3} p={3}>
        <Grid item xs={6}>
          <MDTypography variant="h5">Crear Cliente</MDTypography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="right">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                />
              }
              label="Campos Requeridos"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isJuridic}
                  onChange={(e) => setIsJuridic(e.target.checked)}
                />
              }
              label="Es Persona Jurídica"
            />
          </FormGroup>
        </Grid>
      </Grid>
      <MDBox pb={3} px={3}>
        {isJuridic === true && (
          <>
            <JuridicalForm
              {...{
                countries,
                sections,
                industries,
                consolidators,
                partnerTypes,
                notJuridicEntities,
                errors,
                values,
                touched,
                setFieldValue,
                isRequired,
              }}
            />
          </>
        )}
        {isJuridic === false && (
          <PersonForm
            {...{
              countries,
              consolidators,
              errors,
              values,
              touched,
              setFieldValue,
            }}
          />
        )}
      </MDBox>
    </Card>
  );
}
