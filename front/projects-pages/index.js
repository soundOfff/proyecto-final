import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import DataTable from "/examples/Tables/DataTable";
import Footer from "/examples/Footer";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";

// Custom Components
import Modal from "/components/Modal";

import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { getAll as getAllProjects } from "/actions/projects";
import { show as showProject } from "/actions/projects";

import { getAll as getAllStatuses } from "/actions/project-statuses";
import { show as showStatus } from "/actions/project-statuses";

import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(context) {
  const include = [
    "stages",
    "notes",
    "status",
    "jurisdiction",
    "defendant",
    "plaintiff",
    "responsiblePerson",
    "lawFirm",
    "staffs",
  ];

  const statusId = context.query.statusId;
  const projectId = context.query.projectId;

  let filter = null;
  let statusSelected = null;
  let projectSelected = null;

  if (statusId) {
    filter = { "filter[status]": statusId };
    statusSelected = await showStatus(statusId);
  }

  if (projectId) {
    const include = ["staffs"];
    const params = { include };
    projectSelected = await showProject(projectId, params);
  }

  const params = {
    include,
    ...filter,
  };

  const projects = await getAllProjects(params);
  const statuses = await getAllStatuses();

  return {
    props: {
      projects,
      statuses,
      statusSelected,
      projectSelected,
    },
  };
}

function Projects({ projects, statuses, statusSelected, projectSelected }) {
  const { t, lang } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const dataTableData = {
    columns: [
      { Header: "Cliente", accessor: "responsiblePerson.firstName" },
      { Header: "Saldo/Capital", accessor: "amount" },
      { Header: "Firma Asignada", accessor: "lawFirm.name" },
      { Header: "Jurisdicción", accessor: "jurisdiction.name" },
      { Header: "Estado", accessor: "status.label" },
      { Header: "Etapa", accessor: "stages[0].startTimestamp" },
      { Header: "Comentarios", accessor: "notes[0].content" },
      { Header: "Acciones", accessor: "actions", textAlign: "center" },
    ],

    rows: projects.map((project) => {
      return {
        ...project,
        actions: (
          <>
            <MDButton
              variant="text"
              color="dark"
              onClick={() => {
                handleOpen();
                router.replace({
                  query: {
                    ...router.query,
                    projectId: project.id,
                  },
                });
              }}
            >
              Ver
            </MDButton>
            <Link
              key={project.id}
              href={`/projects/create-notes/${project.id}`}
            >
              <MDButton variant="text" color="dark">
                Agregar Notas
              </MDButton>
            </Link>
          </>
        ),
      };
    }),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Modal open={open} handleClose={handleClose}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <MDBox mt={5} lineHeight={0}>
              <MDTypography variant="h2" textAlign="center">
                Detalles del Caso
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Caso N°:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {projectSelected?.id}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Nombre:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {projectSelected?.name}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Descripción:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {projectSelected?.description}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Coste Total:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  $ {projectSelected?.cost}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Fecha Inicio:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {projectSelected?.startDate}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Fecha Fin:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {projectSelected?.deadline}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox m={5} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                Abogado:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {projectSelected?.staffs[0].firstName}{" "}
                  {projectSelected?.staffs[0].lastName}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </Modal>
      <MDBox my={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                display="flex"
                justifyContent="space-between"
                pt={3}
                px={3}
                mb={4}
              >
                <MDTypography
                  width={"fit-content"}
                  variant="h6"
                  fontWeight="medium"
                >
                  {t("title")}
                </MDTypography>
                <FormControl sx={{ width: "30%" }}>
                  <InputLabel id="status-label">Estado</InputLabel>
                  <Select
                    labelId="status-label"
                    value={statusSelected ? statusSelected.label : ""}
                    label="Status"
                    sx={{ height: "100%" }}
                  >
                    <MenuItem
                      key="all"
                      value="Todos"
                      onClick={() => router.push({})}
                    >
                      Todos
                    </MenuItem>
                    {statuses.map((status) => (
                      <MenuItem
                        key={status.id}
                        value={status.label}
                        onClick={() =>
                          router.push({
                            query: {
                              ...router.query,
                              statusId: status.id,
                            },
                          })
                        }
                      >
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "30%" }}>
                  <MDInput label="Search here" height="100%" />
                </FormControl>
                <Link href="/projects/create">
                  <MDButton variant="gradient" color="dark">
                    New Project
                  </MDButton>
                </Link>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  isSorted={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Projects;
