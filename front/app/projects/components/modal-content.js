// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function ModalComponent({ project }) {
  return (
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
              {project.id}
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
              {project.name}
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
              {project.description}
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
              $ {project.cost}
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
              {project.startDate}
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
              {project.deadline}
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
              {project.staffs[0].firstName} {project.staffs[0].lastName}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
