import React from "react";
import { Grid } from "@mui/material";
import MDTypography from "/components/MDTypography";
import CustomStepper from "./custom-stepper";

export default function SelectedProcesses({
  selectedProcesses = [],
  tasks = [],
}) {
  return (
    <Grid item xs={12} md={selectedProcesses.length > 1 ? 10 : 12} ml={2}>
      <MDTypography variant="button" fontWeight="medium">
        Procesos seleccionados
      </MDTypography>
      {selectedProcesses.length > 1 ? (
        <CustomStepper
          processes={[
            ...selectedProcesses,
            { id: selectedProcesses.length, name: "FIN" },
          ]}
          tasks={tasks}
        />
      ) : (
        <MDTypography
          variant="button"
          fontWeight="regular"
          verticalAlign="center"
          m={5}
        >
          No hay procesos seleccionados
        </MDTypography>
      )}
    </Grid>
  );
}
