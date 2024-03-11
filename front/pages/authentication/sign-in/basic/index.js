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
import logoWhite from "/assets/logo/White/asset-29.svg";

import google from "/assets/logo/google.svg";
import Image from "next/image";

export async function getStaticProps() {
  return { props: { NEXTAUTH_URL: process.env.NEXTAUTH_URL } };
}

function Basic({ NEXTAUTH_URL }) {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

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
        mt={2}
        p={2}
        mb={1}
        textAlign="center"
      >
        <Image
          height={180}
          width={180}
          src={logoWhite}
          style={{
            borderRadius: "50%",
            width: "80%",
            margin: "auto",
          }}
        />
        <MDButton
          onClick={() =>
            signIn("google", {
              callbackUrl: NEXTAUTH_URL,
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
            <Image src={google} height={20} width={20} />
          </MDTypography>
        </MDButton>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
