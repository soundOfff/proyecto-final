"use client";

import Image from "next/image";
import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import logoBlack from "/assets/logo/Black/asset-27.svg";
import logoWhite from "/assets/logo/White/asset-29.svg";
import { useMaterialUIController } from "/context";

export default function Header({ estimate }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox p={3}>
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          <MDBox width="50%" p={1} mb={6}>
            <Image
              src={darkMode ? logoWhite : logoBlack}
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox p={1} display="flex" justifyContent="end">
            <MDTypography
              variant="h6"
              color={darkMode ? "text" : "secondary"}
              fontWeight="regular"
              mr={1}
            >
              Proforma Número:
            </MDTypography>
            <MDTypography variant="h5" fontWeight="medium">
              #{estimate.number}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MDTypography variant="h6" fontWeight="medium">
            {estimate.partner.billingStreet}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium">
            {estimate.partner.billingCity
              ? `${estimate.partner.billingCity}, `
              : null}
            {estimate.partner.billingState
              ? estimate.partner.billingState
              : null}
            {estimate.partner.billingCountry
              ? `, ${estimate.partner.billingCountry.name}`
              : null}
          </MDTypography>
          <MDBox mt={1} mb={2}>
            <MDTypography
              display="block"
              variant="body2"
              color={darkMode ? "text" : "secondary"}
            >
              teléfono: {estimate.partner.phoneNumber}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox width="100%" textAlign={{ xs: "left", md: "right" }}>
            <MDBox mt={1}>
              <MDTypography variant="h6" fontWeight="medium">
                Para: {estimate.partner.company}
              </MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography
                variant="body2"
                color={darkMode ? "text" : "secondary"}
              >
                Fecha de Creación: {estimate.date}
                <br />
                Fecha de Caducidad: {estimate.expiryDate}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox mt={5}>
            <MDTypography
              display="inline"
              variant="h6"
              fontWeight="medium"
              mr={1}
            >
              Caso:
            </MDTypography>
            <MDTypography
              display="inline"
              variant="body2"
              color={darkMode ? "text" : "secondary"}
            >
              {estimate.project.name}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
