"use client";

import { Card, Grid } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";
import { useSession } from "next-auth/react";

export default function Info() {
  const { data: session } = useSession();

  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={session.user.image}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {session.staff.name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {session.staff.email}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography mr={5} variant="caption" fontWeight="regular">
                {session.staff.phoneNumber}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}
