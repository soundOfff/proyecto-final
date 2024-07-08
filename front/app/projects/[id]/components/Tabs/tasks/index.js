"use client";

import { useDataProvider } from "/providers/DataProvider";
import { Autocomplete, Grid } from "@mui/material";
import Table from "/components/Tasks/table-client";
import MDBox from "/components/MDBox";
import Stats from "./components/stats";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";
import { useState } from "react";
import { attachTasks } from "/actions/projects";

export default function Tasks() {
  const {
    statuses,
    priorities,
    staffs,
    project,
    repeats,
    tagsData,
    partners,
    dependencyTasks,
    taskableItems,
    actionsData,
    tableFields,
  } = useDataProvider();

  const [selectedProcess, setSelectedProcess] = useState(null);
  const [isAttachingTasks, setIsAttachingTasks] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [createdSB, setCreatedSB] = useState(false);
  const process = project.serviceType?.processes?.at(-1) ?? null;

  const handleSelectNextStep = async () => {
    setIsAttachingTasks(true);
    try {
      await attachTasks(project.id, selectedProcess.id);
      setCreatedSB(true);
    } catch (error) {
      setErrorSB(true);
    }
    setIsAttachingTasks(false);
  };

  const showNextStepForm = () => {
    // TODO Get if last task in project is completed
    if (!process) return false;
    return process.forks.length > 0;
  };

  return (
    <MDBox py={3}>
      <Stats />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MDBox py={1}>
            <Table
              {...{
                statuses,
                priorities,
                staffs,
                project,
                repeats,
                tagsData,
                partners,
                dependencyTasks,
                taskableItems,
                actionsData,
                tableFields,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          {showNextStepForm() && false && (
            <>
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
                <MDBox display="flex" flexDirection="row" gap={1} width="100%">
                  <Grid container xs={12} spacing={3}>
                    <Grid item xs={12} sm={5}>
                      <Autocomplete
                        value={process}
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
                        options={process?.forks || []}
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
                      {selectedProcess &&
                        selectedProcess.realStepQuantity == 0 && (
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
              </MDBox>
            </>
          )}
        </Grid>
      </Grid>
      <MDSnackbar
        color={errorSB ? "error" : "success"}
        icon={errorSB ? "warning" : "check_circle"}
        title={
          errorSB
            ? "Error al seleccionar paso"
            : "Paso seleccionado correctamente"
        }
        content={
          errorSB
            ? "Ocurrió un error al seleccionar el paso, intente de nuevo"
            : "El paso se seleccionó correctamente"
        }
        open={errorSB || createdSB}
        onClose={() => {
          setErrorSB(false);
          setCreatedSB(false);
        }}
        close={() => {
          setErrorSB(false);
          setCreatedSB(false);
        }}
        bgWhite
      />
    </MDBox>
  );
}
