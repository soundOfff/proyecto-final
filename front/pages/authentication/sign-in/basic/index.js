/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { signIn } from "next-auth/react";

// @mui material components
import MuiLink from "@mui/material/Link";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

// Authentication layout components
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";

// Images
import logoWhite from "/assets/logo/crm-logo-negro-fondo.png";

import google from "/assets/logo/google.svg";
import Image from "next/image";
import { Checkbox, FormControlLabel } from "@mui/material";

export async function getStaticProps() {
  return { props: { NEXTAUTH_URL: process.env.NEXTAUTH_URL } };
}

function Basic({ NEXTAUTH_URL }) {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <BasicLayout>
      <MDBox
        variant="gradient"
        bgColor="dark"
        display="flex"
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius="lg"
        coloredShadow="dark"
        mx={2}
        sx={{ padding: "20px 40px" }}
        textAlign="center"
      >
        <Image
          height={180}
          width={180}
          src={logoWhite}
          alt="logo"
          style={{
            borderRadius: "2%",
            width: "80%",
            margin: "auto",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              name="rememberMe"
            />
          }
          label={
            <MDTypography variant="body2" color="white">
              Recordar sesión
            </MDTypography>
          }
          sx={{ mb: 2 }}
        />
        <MDButton
          onClick={() =>
            signIn("google", {
              callbackUrl: `${NEXTAUTH_URL}/check-session`,
            })
          }
        >
          <MDTypography
            component={MuiLink}
            href="#"
            variant="body2"
            color="dark"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <span>Continuar con Google</span>
            <Image src={google} height={20} width={20} alt="google image" />
          </MDTypography>
        </MDButton>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
