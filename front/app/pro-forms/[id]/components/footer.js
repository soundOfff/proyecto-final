"use client";

import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { useMaterialUIController } from "/context";

export default function Footer({ estimate }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox p={3} mt={7}>
      <Grid container>
        <Grid item xs={12} lg={5}>
          {/* <MDTypography variant="h5" fontWeight="medium">
            Thank you!
          </MDTypography>
          <MDBox mt={1} mb={2} lineHeight={0}>
            <MDTypography
              variant="button"
              color={darkMode ? "text" : "secondary"}
            >
              If you encounter any issues related to the invoice you can contact
              us at:
            </MDTypography>
          </MDBox>
          <MDTypography
            component="span"
            variant="h6"
            fontWeight="regular"
            color={darkMode ? "text" : "secondary"}
          >
            email:{" "}
            <MDTypography component="span" variant="h6" fontWeight="regular">
              support@creative-tim.com
            </MDTypography>
          </MDTypography> */}
        </Grid>
        <Grid item xs={12} lg={7}>
          <MDBox
            width="100%"
            height={{ xs: "auto", md: "100%" }}
            display="flex"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="flex-end"
            mt={{ xs: 2, md: 0 }}
          >
            <MDButton
              variant="gradient"
              color="dark"
              onClick={() => window.print(this)}
            >
              print
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
