"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import Loader from "/components/Loader";
import MDSnackbar from "/components/MDSnackbar";
import { CircularProgress, Grid } from "@mui/material";
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
import Link from "next/link";

function DocumentLink({ url }) {
  return (
    <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Link
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{ color: "black", textDecoration: "none" }}
      >
        <MDButton variant="outlined" size="small" color="dark">
          Abrir documento
        </MDButton>
      </Link>
    </MDBox>
  );
}

function ErrorList({ errors }) {
  return (
    <>
      <MDBox mt={1} mb={1} ml={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Los siguientes campos contienen errores
        </MDTypography>
      </MDBox>
      <MDBox component="ul" m={0} pl={4} mb={1}>
        {errors.map((error, index) => (
          <MDBox
            component="li"
            key={index}
            color="text"
            fontSize="1.25rem"
            lineHeight={1}
          >
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
              verticalAlign="middle"
            >
              {error}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </>
  );
}

export default function Header() {
  const { project } = useDataProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [generateErrorSb, setGenerateErrorSb] = useState(false);
  const [generateSuccessSb, setGenerateSuccessSb] = useState(false);
  const [generateInfo, setGenerateInfo] = useState(null);
  const [generateLink, setGenerateLink] = useState("#");
  const [errors, setErrors] = useState([]);
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

  const handleProjectDelete = () => {
    handleDelete(project.id);
  };

  const handleGenerateDocument = async () => {
    setIsLoading(true);
    const { errors, data } = await generate(project.id);
    if (errors) {
      setIsLoading(false);
      setGenerateErrorSb(true);
      setGenerateInfo("Error al generar documento");
      setErrors(errors);
    } else {
      setIsLoading(false);
      setGenerateSuccessSb(true);
      setGenerateInfo("Documento generado correctamente");
      setGenerateLink(data);
    }
  };

  const renderSnackbar = () => {
    if (isLoading) {
      return (
        <MDSnackbar
          color="dark"
          bgWhite
          title={
            <MDBox display="flex" justifyContent="center" gap={2}>
              <CircularProgress size={18} color="dark" />
              <MDTypography variant="button" color="dark">
                Generando documento...
              </MDTypography>
            </MDBox>
          }
          content={
            <MDTypography variant="caption" color="dark">
              Este proceso puede tardar unos minutos. Por favor, espere.
            </MDTypography>
          }
          open={isLoading}
          close={() => setIsLoading(false)}
        />
      );
    }
    if (generateErrorSb) {
      return (
        <MDSnackbar
          color="error"
          icon="error"
          title="Error al generar documento"
          content={<ErrorList errors={errors} />}
          open={generateErrorSb}
          close={() => setGenerateErrorSb(false)}
          bgWhite
        />
      );
    }
    if (generateSuccessSb) {
      return (
        <MDSnackbar
          color="success"
          icon="check_circle"
          title="Documento generado correctamente"
          content={<DocumentLink url={generateLink} />}
          open={generateSuccessSb}
          onClose={() => setGenerateSuccessSb(false)}
          close={() => setGenerateSuccessSb(false)}
          bgWhite
        />
      );
    }
  };

  return (
    <Grid container mt={3} mb={5} lineHeight={0}>
      {renderSnackbar()}
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
            Generar Poder
          </MDButton>
          <Link
            href={{
              pathname: `/projects/${project.id}/edit`,
              query: { source: `/projects/${project.id}?tab=description` },
            }}
          >
            <MDButton
              variant="gradient"
              color="dark"
              size="small"
              sx={{ height: "40px", width: "130px", ml: 2 }}
            >
              Editar
              <EditIcon sx={{ ml: 1 }} />
            </MDButton>
          </Link>
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
          {project.documentUrl && (
            <Link href={project.documentUrl} target="blank">
              <MDButton
                variant="gradient"
                color="success"
                size="small"
                sx={{ height: "40px", width: "130px", ml: 2 }}
              >
                Ver documento
              </MDButton>
            </Link>
          )}
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
