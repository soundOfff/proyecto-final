"use client";

import Image from "next/image";
import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import logo from "/assets/logo/brandfactors-logo.png";
import { useMaterialUIController } from "/context";
import Link from "next/link";
import MDBadge from "/components/MDBadge";
import { getColor } from "/utils/state-colors";

export default function Header({ invoice }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox p={3}>
      <Grid container justifyContent="space-between">
        <Grid item xs={4}>
          <MDBox>
            <Image
              src={logo}
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
          <MDBox px={1} display="flex" justifyContent="end">
            <MDTypography
              variant="h6"
              color={darkMode ? "text" : "secondary"}
              fontWeight="regular"
              mr={1}
            >
              Factura Número:
            </MDTypography>
            <MDTypography variant="h5" fontWeight="medium">
              #{invoice.number}
            </MDTypography>
          </MDBox>
          <MDBox p={1} display="flex" justifyContent="end">
            {" "}
            <MDBadge
              variant="contained"
              badgeContent={invoice.status.label}
              color={getColor(invoice.status.id)}
              size="xs"
              container
              sx={{ height: "2rem" }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          {invoice.partner && (
            <MDBox>
              <MDTypography variant="h6" fontWeight="medium">
                {invoice.partner.billingStreet}
              </MDTypography>
              <MDTypography variant="h6" fontWeight="medium">
                {invoice.partner.billingCity
                  ? `${invoice.partner.billingCity}, `
                  : null}
                {invoice.partner.billingState
                  ? invoice.partner.billingState
                  : null}
                {invoice.partner.billingCountry
                  ? `, ${invoice.partner.billingCountry.name}`
                  : null}
              </MDTypography>
              <MDBox mt={1} mb={2}>
                <MDTypography
                  display="block"
                  variant="body2"
                  color={darkMode ? "text" : "secondary"}
                >
                  {invoice.partner.phoneNumber
                    ? `teléfono: ${invoice.partner.phoneNumber}`
                    : null}
                </MDTypography>
              </MDBox>
            </MDBox>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox width="100%" textAlign={{ xs: "left", md: "right" }}>
            <MDBox>
              <MDTypography variant="h6" fontWeight="medium">
                Para: {invoice?.partner?.mergedName ?? "---"}
              </MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography
                variant="body2"
                color={darkMode ? "text" : "secondary"}
              >
                Fecha de Creación: {invoice.date}
                <br />
                Fecha de Caducidad: {invoice.expiryDate}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          {invoice.project && (
            <MDBox mt={5}>
              <MDTypography
                display="inline"
                variant="h6"
                fontWeight="medium"
                mr={1}
              >
                Caso:
              </MDTypography>
              <Link href={`/projects/${invoice.project.id}`}>
                <MDTypography display="inline" variant="body2" color="info">
                  {invoice.project.name}
                </MDTypography>
              </Link>
            </MDBox>
          )}
        </Grid>
      </Grid>
    </MDBox>
  );
}
