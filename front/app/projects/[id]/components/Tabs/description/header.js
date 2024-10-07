"use client";

import { useState } from "react";
import Link from "next/link";

import MDSnackbar from "/components/MDSnackbar";
import { CircularProgress, Divider, Grid } from "@mui/material";
import { setColor } from "/utils/project-state-colors";

import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import MDButton from "/components/MDButton";
import MDBox from "/components/MDBox";
import Modal from "/components/Modal";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import { useDataProvider } from "/providers/DataProvider";
import useDeleteRow from "/hooks/useDeleteRow";
import { destroy } from "/actions/projects";
import { generate } from "/actions/documents";
import DeleteRow from "/components/DeleteRow";
import SlackButton from "/components/SlackButton";
import useSlackShare from "/hooks/useSlackShare";
import SlackShare from "/components/ModalContent/SlackShare";

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

function ErrorList({ errors, partners }) {
  if (!errors["apoderado"] && !errors["demandante"] && !errors["demandado"]) {
    return (
      <MDBox my={1} mx={3} p={4}>
        <MDTypography variant="body2" fontWeight="medium" color="error">
          Ha ocurrido un error inesperado: {errors[0]}
        </MDTypography>
      </MDBox>
    );
  }
  const getUrl = (key) => {
    let partner;
    if (key === "apoderado") {
      partner = partners.find(
        (partner) => partner.role.label.toLowerCase() === "demandante"
      )?.owner;
    } else {
      partner = partners.find(
        (partner) => partner.role.label.toLowerCase() === key
      );
    }
    if (!partner) return "#";

    return `/partners/${partner.id}/profile`;
  };

  return (
    <MDBox m={2}>
      <MDBox my={1} mx={3}>
        <MDTypography variant="body2" fontWeight="medium" color="text">
          Los siguientes campos contienen errores
        </MDTypography>
        <Divider />
      </MDBox>
      {Object.keys(errors).map((key, index) => (
        <MDBox key={index} mt={2}>
          <MDTypography variant="caption" color="error">
            Se han detectado los siguientes {errors[key].length} problemas con
            el {key}
          </MDTypography>
          <MDBox component="ul" m={0} pl={4} mb={1}>
            {errors &&
              errors[key] &&
              errors[key].map((error, i) => (
                <MDBox
                  component="li"
                  key={i}
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
          <Link href={getUrl(key)} target="_blank">
            <MDTypography variant="caption" color="info">
              [Solucionar Problemas]
            </MDTypography>
          </Link>
        </MDBox>
      ))}
    </MDBox>
  );
}

export default function Header() {
  const { project } = useDataProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [generateErrorSb, setGenerateErrorSb] = useState(false);
  const [generateSuccessSb, setGenerateSuccessSb] = useState(false);

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
  const { openSlackShareModal, setOpenSlackShareModal } = useSlackShare({
    model: project,
  });

  const handleProjectDelete = () => {
    handleDelete(project.id);
  };

  const handleGenerateDocument = async () => {
    setIsLoading(true);
    const { errors, data } = await generate(project.id);
    if (errors && Object.keys(errors).length > 0) {
      setIsLoading(false);
      setGenerateErrorSb(true);
      setErrors(errors);
    } else {
      setIsLoading(false);
      setGenerateErrorSb(false);
      setErrors([]);
      setGenerateSuccessSb(true);
      setGenerateLink(data);
    }
  };

  const renderSnackbar = () => {
    if (isLoading && !generateErrorSb) {
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
    <>
      {renderSnackbar()}
      <Modal
        width="max-content"
        height="min-content"
        border="0px solid transparent"
        open={generateErrorSb}
        onClose={() => setGenerateErrorSb(false)}
      >
        <MDBox>
          <SlackButton
            onClick={() => {
              setOpenSlackShareModal(true);
            }}
          />
          <SlackShare
            open={openSlackShareModal}
            onClose={() => {
              setOpenSlackShareModal(false);
            }}
            modelId={project.id}
            modelType="Project"
          />

          <ErrorList errors={errors} partners={project.partners} />
          <MDBox display="flex" justifyContent="space-between">
            <MDButton
              variant="gradient"
              color="light"
              size="small"
              onClick={() => setGenerateErrorSb(false)}
              sx={{ height: "40px", ml: 2 }}
            >
              Cancelar
            </MDButton>
            <MDButton
              variant="gradient"
              color="dark"
              size="small"
              sx={{ height: "40px", ml: 2 }}
              onClick={handleGenerateDocument}
            >
              {isLoading ? (
                <CircularProgress size={20} color="white" />
              ) : (
                "Reintentar"
              )}
            </MDButton>
          </MDBox>
        </MDBox>
      </Modal>
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
    </>
  );
}
