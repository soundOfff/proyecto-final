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

import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { getAll as getAllProjects } from "/services/projects";

import { getAll as getAllStatuses } from "/services/project-statuses";
import { getOne as getOneStatus } from "/services/project-statuses";

import { useRouter } from "next/router";

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
  const filters = statusId ? { "filter[status]": statusId } : null;
  const statusSelected = statusId ? await getOneStatus(statusId) : null;

  const params = {
    include,
    ...filters,
  };

  const projects = await getAllProjects(params);
  const statuses = await getAllStatuses();

  return {
    props: {
      projects,
      statuses,
      statusSelected,
    },
  };
}

function Projects({ projects, statuses, statusSelected }) {
  const { t, lang } = useTranslation("common");
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
      { Header: "Acciones", accessor: "actions" },
    ],

    rows: projects.map((project) => {
      return {
        ...project,
        actions: (
          <Link key={project.id} href={`/projects/show/${project.id}`}>
            <MDButton variant="text" color="dark">
              Ver
            </MDButton>
          </Link>
        ),
      };
    }),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                      onClick={(e) => router.push(`/projects`)}
                    >
                      Todos
                    </MenuItem>
                    {statuses.map((status) => (
                      <MenuItem
                        key={status.id}
                        value={status.label}
                        onClick={(e) =>
                          router.push(`/projects?statusId=${status.id}`)
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
