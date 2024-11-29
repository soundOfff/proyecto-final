"use client";

import { Autocomplete, Divider, Grid } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { attachTasks } from "/actions/projects";

import { useMaterialUIController, setSnackbar } from "/context";

export default function NextStepForm({ task }) {
  const [_, dispatch] = useMaterialUIController();
  const { data: session } = useSession();

  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [isAttachingTasks, setIsAttachingTasks] = useState(false);

  const handleSelectNextStep = async () => {
    setIsAttachingTasks(true);
    try {
      await attachTasks({
        project_id: task.taskable.id,
        procedure_id: selectedProcedure?.toProcedureId,
        staff_id: session.staff.id,
      });
      setSnackbar(dispatch, {
        color: "success",
        icons: "check_circle",
        title: "El paso se ha seleccionado correctamente",
        content: "Se han creado las tareas correspondientes",
        bgWhite: true,
      });
    } catch (error) {
      setSnackbar(dispatch, {
        color: "error",
        icon: "warning",
        title: "Error al seleccionar paso",
        content: error?.message,
        bgWhite: true,
      });
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
              value={task?.procedure?.incomingPaths[0]}
              disabled
              options={task?.procedure?.incomingPaths}
              getOptionLabel={(option) => option.fromProcedure?.name}
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
              value={selectedProcedure}
              onChange={(_, value) => {
                setSelectedProcedure(value);
              }}
              options={task?.procedure?.outgoingPaths}
              getOptionLabel={(option) => option.toProcedure.name}
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
          </Grid>
          <Grid item xs={12} sm={2}>
            <MDButton
              variant="gradient"
              color="dark"
              disabled={!selectedProcedure || isAttachingTasks}
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
