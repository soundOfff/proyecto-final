"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Loader from "/components/Loader";
import { Grid } from "@mui/material";
import { setColor } from "/utils/project-state-colors";

import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import MDButton from "/components/MDButton";
import MDBox from "/components/MDBox";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import { useDataProvider } from "/providers/DataProvider";
import useDeleteRow from "/hooks/useDeleteRow";
import { destroy } from "/actions/projects";
import { generate } from "/actions/documents";
import DeleteRow from "/components/DeleteRow";

export default function Header() {
  const { project } = useDataProvider();
  const [isLoading, setIsLoading] = useState(false);
  const {
    setOpenDeleteConfirmation,
    errorSB,
    setErrorSB,
    errorMsg,
    setErrorMsg,
    handleDelete,
    openDeleteConfirmation,
    setDeleteConfirmed,
  } = useDeleteRow(destroy);
  const router = useRouter();

  const handleEditButton = () => {
    router.push(`/projects/${project.id}/edit`);
  };

  const handleProjectDelete = () => {
    handleDelete(project.id);
  };

  const handleGenerateDocument = () => {
    setIsLoading(true);
    generate()
      .then((data) => {
        setIsLoading(false);
        window.open(data.url, "_blank");
      })
      .catch(() => setIsLoading(false));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container mt={3} mb={5} lineHeight={0}>
      <Grid item xs={12} md={6}>
        <MDTypography
          variant="h4"
          textAlign="center"
          mr={5}
          display="inline-block"
          mb={{ xs: 5 }}
        >
          {project.name}
        </MDTypography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent={{ xs: "center", md: "flex-end" }}
      >
        <MDBox mb={2}>
          <MDBadge
            variant="contained"
            color="info"
            badgeContent={`Expediente #${project.expedient ?? ""}`}
            container
            sx={{ height: "40px", ml: 2 }}
          />
          <MDBadge
            variant="contained"
            badgeContent={project.status.label}
            color={setColor(project.status.label)}
            container
            sx={{ height: "40px", ml: 2 }}
          />
        </MDBox>
        <MDBox>
          <MDButton
            variant="gradient"
            color="dark"
            size="small"
            onClick={handleGenerateDocument}
            sx={{
              height: "40px",
              width: "130px",
              ml: 2,
            }}
          >
            Generar Documento
          </MDButton>
          <MDButton
            variant="gradient"
            color="dark"
            size="small"
            onClick={handleEditButton}
            sx={{ height: "40px", width: "130px", ml: 2 }}
          >
            Editar
            <EditIcon sx={{ ml: 1 }} />
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            size="small"
            onClick={handleProjectDelete}
            sx={{ height: "40px", width: "130px", ml: 2 }}
          >
            Eliminar
            <DeleteIcon sx={{ ml: 1 }} />
          </MDButton>
        </MDBox>
      </Grid>
      <DeleteRow
        {...{
          setOpenDeleteConfirmation,
          errorSB,
          setErrorSB,
          errorMsg,
          setErrorMsg,
          openDeleteConfirmation,
          setDeleteConfirmed,
        }}
      />
    </Grid>
  );
}
