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
import HandIcon from "/assets/logo/Black/hand.svg";
import Image from "next/image";
import { parseProjectDescription } from "../../../../../utils/parseProjectDescription";

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
          <MDTypography variant="h4" mr={{ md: 10, xs: 2 }}>
            {project.name}
          </MDTypography>

          <MDBadge
            variant="contained"
            color="info"
            badgeContent={`Expediente ${project.expedient}`}
            container
            sx={{ maxHeight: "40px", marginTop: "0" }}
          />
        </MDBox>
        <Grid container mt={3}>
          <Grid item xs={12} xxl={2} display="flex">
            <MonetizationOnOutlinedIcon sx={{ mr: 1 }} />
            <MDTypography variant="h6" color="text" fontWeight="light">
              {moneyFormat(project.cost)}
            </MDTypography>
          </Grid>
          {project.billablePartner && (
            <Grid item xs={12} xxl={3} display="flex">
              <Image
                src={HandIcon}
                width="20"
                height="17"
                alt="Hand Icon"
                style={{ marginRight: "10px" }}
              />
              <MDTypography variant="h6" color="text" fontWeight="light">
                {project.billablePartner.mergedName}
              </MDTypography>
            </Grid>
          )}
          <Grid item xs={12} xxl={3} mr={5} display="flex">
            <DateRangeIcon />
            <MDTypography variant="h6" fontWeight="light" sx={{ mx: 1 }}>
              Desde
            </MDTypography>
            <MDTypography variant="h6" color="text" fontWeight="light">
              {project.startDate}
            </MDTypography>
          </Grid>
          {project.deadline && (
            <Grid item xs={12} xxl={3} display="flex">
              <DateRangeIcon />
              <MDTypography
                variant="h6"
                color="caption"
                fontWeight="light"
                sx={{ mx: 1 }}
              >
                Hasta
              </MDTypography>
              <MDTypography variant="h6" color="text" fontWeight="light">
                {project.deadline}
              </MDTypography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={5}
          mx={{ xl: 10, xs: 0 }}
          mt={{ xl: 3, xs: 0 }}
          justifyContent="center"
        >
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
        <Grid
          container
          spacing={5}
          mx={{ xl: 10, xs: 0 }}
          justifyContent="center"
        >
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
      {project.staffs > 0 && (
        <Grid item xs={12}>
          <Grid
            container
            spacing={5}
            mx={{ xl: 10, xs: 0 }}
            justifyContent="center"
          >
            <Grid item xs={6}>
              <MDTypography variant="body2" fontWeight="medium">
                Abogado Principal
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="body2" color="text">
                {project.staffs[0]?.firstName} {project.staffs[0]?.lastName}
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>
      )}

      {parseProjectDescription(project.description) && (
        <MDBox m={5} lineHeight={1}>
          <MDTypography variant="h4" textAlign="center" my={2}>
            Descripción
          </MDTypography>
          <MDTypography
            variant="body2"
            textTransform="capitalize"
            paragraph
            dangerouslySetInnerHTML={{
              __html:
                parseProjectDescription(project.description) ??
                "Sin descripción",
            }}
          ></MDTypography>
        </MDBox>
      )}
    </Grid>
  );
}
