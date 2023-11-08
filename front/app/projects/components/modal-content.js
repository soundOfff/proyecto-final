"use client";
// @mui material components
import Grid from "@mui/material/Grid";
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDTypography from "/components/MDTypography";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moneyFormat from "/utils/moneyFormat";
import { Divider } from "@mui/material";

export default function ModalComponent({ project }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MDBox
          mt={3}
          lineHeight={0}
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography variant="h5" textAlign="center" mr={10}>
            {project.name}
          </MDTypography>

          <MDBadge
            variant="contained"
            color="info"
            badgeContent={`Caso Número ${project.id}`}
            container
            sx={{ maxHeight: "40px", marginTop: "0" }}
          />
        </MDBox>
        <MDBox display="flex" alignContent="baseline" mt={3}>
          <MonetizationOnOutlinedIcon sx={{ mx: 1 }} />
          <MDTypography variant="h6" fontWeight="light">
            {moneyFormat(project.amount)}
          </MDTypography>
          <DateRangeIcon sx={{ ml: 4, mr: 1 }} />
          <MDTypography variant="h6" fontWeight="light" sx={{ mr: 1 }}>
            Desde
          </MDTypography>
          <MDTypography variant="h6" color="text" fontWeight="light">
            {project.startDate}
          </MDTypography>
          <DateRangeIcon sx={{ ml: 4, mr: 1 }} />
          <MDTypography
            variant="h6"
            color="caption"
            fontWeight="light"
            sx={{ mr: 1 }}
          >
            Hasta
          </MDTypography>
          <MDTypography variant="h6" color="text" fontWeight="light">
            {project.deadline}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} mt={5}>
        <Grid container spacing={5} mx={10} justifyContent="center">
          <Grid item xs={6}>
            <MDTypography variant="body2" fontWeight="medium">
              Horas Estimadas
            </MDTypography>
          </Grid>
          <Grid item xs={6}>
            <MDTypography variant="body2" color="text">
              {project.estimatedHours}
            </MDTypography>
          </Grid>
        </Grid>
        <Divider fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5} mx={10} justifyContent="center">
          <Grid item xs={6}>
            <MDTypography variant="body2" fontWeight="medium">
              Fecha De Creación
            </MDTypography>
          </Grid>
          <Grid item xs={6}>
            <MDTypography variant="body2" color="text">
              {project.startDate}
            </MDTypography>
          </Grid>
        </Grid>
        <Divider fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5} mx={10} justifyContent="center">
          <Grid item xs={6}>
            <MDTypography variant="body2" fontWeight="medium">
              Abogado Principal
            </MDTypography>
          </Grid>
          <Grid item xs={6}>
            <MDTypography variant="body2" color="text">
              {project.staffs[0].firstName} {project.staffs[0].lastName}
            </MDTypography>
          </Grid>
        </Grid>
      </Grid>
      <MDBox m={5} lineHeight={1}>
        <MDTypography variant="h4" textAlign="center" m={2}>
          Descripción
        </MDTypography>
        <MDTypography variant="body2" textTransform="capitalize" paragraph>
          {project.description}
        </MDTypography>
      </MDBox>
    </Grid>
  );
}
