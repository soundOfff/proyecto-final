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

import dataTableData from "/pagesComponents/projects/data/projectData";
import useTranslation from "next-translate/useTranslation";

function Projects() {
  const { t, lang } = useTranslation("common");
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
              >
                <MDTypography
                  width={"fit-content"}
                  variant="h6"
                  fontWeight="medium"
                >
                  {t("title")}
                </MDTypography>
                <MDButton variant="gradient" color="dark">
                  New Project
                </MDButton>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
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
