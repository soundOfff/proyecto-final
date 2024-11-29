"use client";

import Image from "next/image";
import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import logo from "/assets/logo/brandfactors-logo.png";
import { useMaterialUIController } from "/context";

export default function Header({ proposal }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox p={3}>
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          <MDBox width="80%" p={1} mb={6}>
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
          <MDBox p={1} display="flex" justifyContent="end">
            <MDTypography
              variant="h6"
              color={darkMode ? "text" : "secondary"}
              fontWeight="regular"
              mr={1}
            >
              Propuesta Número:
            </MDTypography>
            <MDTypography variant="h5" fontWeight="medium">
              #{proposal.id}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MDBox>
            <MDTypography variant="h6" fontWeight="medium">
              {proposal.address}
            </MDTypography>
            <MDTypography variant="h6" fontWeight="medium">
              {proposal.city ? `${proposal.city}, ` : null}
              {proposal.state ? proposal.state : null}
              {proposal.country ? `, ${proposal.country.shortName}` : null}
            </MDTypography>
            <MDBox mt={1} mb={2}>
              <MDTypography
                display="block"
                variant="body2"
                color={darkMode ? "text" : "secondary"}
              >
                {proposal.phone ? `teléfono: ${proposal.phone}` : null}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox width="100%" textAlign={{ xs: "left", md: "right" }}>
            <MDBox mt={1}>
              <MDTypography variant="h6" fontWeight="medium">
                Para:{" "}
                {proposal.proposalTo
                  ? proposal.proposalTo
                  : proposal.proposable.name}
              </MDTypography>
            </MDBox>
            <MDBox mb={1}>
              <MDTypography
                variant="body2"
                color={darkMode ? "text" : "secondary"}
              >
                Fecha de Creación: {proposal.date}
                <br />
                Válido Hasta: {proposal.openTill}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
