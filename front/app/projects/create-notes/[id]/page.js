import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDEditor from "/components/MDEditor";

import Link from "next/link";

function Projects() {
  return (
    <MDBox py={3} mb={10}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} lg={10}>
          <Card>
            <MDBox pt={3} px={3} mb={4}>
              <MDTypography sx={{ mb: 5, textAlign: "center" }}>
                Notas Privadas
              </MDTypography>
              <MDEditor editorStyle={{ minHeight: "40vh" }} />
              <MDBox display="flex" justifyContent="end" my={5}>
                <Link href="/projects">
                  <MDButton variant="gradient" color="dark">
                    Guardar
                  </MDButton>
                </Link>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Projects;
