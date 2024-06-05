"use client";

import { Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import PersonForm from "./person-form";
import JuridicalForm from "./juridical-form";

export default function DetailFormComponent({
  consolidators,
  countries,
  notJuridicEntities,
  errors,
  values,
  touched,
  setFieldValue,
  isJuridic,
  setIsJuridic,
}) {
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3} display="flex" justifyContent="space-between">
        <MDTypography variant="h5">Crear Cliente</MDTypography>
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
      </MDBox>
      <MDBox pb={3} px={3}>
        {isJuridic === true && (
          <>
            <JuridicalForm
              {...{
                countries,
                consolidators,
                notJuridicEntities,
                errors,
                values,
                touched,
                setFieldValue,
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
