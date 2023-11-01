import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import DataTable from "/examples/Tables/DataTable";
import Footer from "/examples/Footer";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";

import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export async function getStaticProps() {
  const includes = [
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

  const params = {
    include: includes.join(","),
  };

  const url = new URL(`${process.env.API_URL}/projects?${params}`);
  url.search = new URLSearchParams(params);

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  return {
    props: {
      projects: data.data.projects,
    },
    revalidate: 10,
  };
}

function Projects({ projects }) {
  const { t, lang } = useTranslation("common");

  const dataTableData = {
    columns: [
      { Header: "Cliente", accessor: "responsiblePerson.firstName" },
      { Header: "Saldo/Capital", accessor: "amount" },
      { Header: "Firma Asignada", accessor: "lawFirm.name" },
      { Header: "Jurisdicción", accessor: "jurisdiction.name" },
      { Header: "Etapa", accessor: "stages[0].startTimestamp" },
      { Header: "Comentarios", accessor: "notes[0].content" },
      { Header: "Acciones", accessor: "actions" },
    ],

    rows: projects.map((project) => {
      return {
        ...project,
        actions: (
          <Link key={project.id} href={`/projects/${project.id}`}>
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
                <MDBox pr={1}>
                  <MDInput label="Search here" sx={{ width: "300px" }} />
                </MDBox>
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
