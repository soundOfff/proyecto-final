"use client";

import { Autocomplete, Divider, Grid } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";
import { useState } from "react";

export default function NextStepForm({ task, selectedFork }) {
  const [selectedProcess, setSelectedProcess] = useState(selectedFork);
  const [isAttachingTasks, setIsAttachingTasks] = useState(false);

  const handleSelectNextStep = async () => {
    setIsAttachingTasks(true);
    try {
      await attachTasks({
        projectId: task.taskable.id,
        processId: selectedProcess.id,
        staffId: session.staff.id,
      });
      setCreatedSB(true);
    } catch (error) {
      setErrorSB(true);
    }
    setIsAttachingTasks(false);
  };

  return (
    <MDBox>
      <MDTypography variant="body2" fontWeight="bold">
        Elegir siguiente paso
      </MDTypography>
      <MDBox
        py={2}
        display="flex"
        gap={2}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          xs={12}
          spacing={3}
          display="flex"
          flexWrap="wrap"
          width="100%"
          gap={1}
        >
          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={task?.procedure?.process}
              disabled
              options={[]}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  label={"Paso anterior"}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Autocomplete
              value={selectedProcess}
              onChange={(e, value) => {
                setSelectedProcess(value);
              }}
              options={task?.procedure?.process?.forks || []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  label={"Siguiente paso"}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            {selectedProcess && selectedProcess.realStepQuantity == 0 && (
              <MDTypography variant="caption" color="error">
                Este paso no tiene procedimientos asociados
              </MDTypography>
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <MDButton
              variant="gradient"
              color="dark"
              disabled={
                !selectedProcess ||
                isAttachingTasks ||
                selectedProcess.realStepQuantity == 0
              }
              onClick={handleSelectNextStep}
            >
              Seleccionar paso
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <Divider />
    </MDBox>
  );
}
