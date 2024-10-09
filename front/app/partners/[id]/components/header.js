"use client";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";
import SlackShare from "/components/SlackShare";

function Header({ contact, partner }) {
  return (
    <Card id="profile" sx={{ mb: 3 }}>
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={`/images/contacts/${contact?.profileImage}`}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {contact?.firstName} {contact?.lastName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                Contacto Principal
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography mr={5} variant="caption" fontWeight="regular">
                {contact?.email}
              </MDTypography>

              <SlackShare modelId={partner?.id} modelType="Partner" />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
