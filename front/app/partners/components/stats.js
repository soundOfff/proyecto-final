import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

export default function Stats({ stats }) {
  return (
    <Grid container sx={{ mx: { xs: 0, sm: 2 } }}>
      <Grid item xs={12} md={6} lg={12}>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <MDBox display="flex" my={2} mx={{ xs: "10vw", sm: "15vw", md: 0 }}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth="100px"
              >
                {stats.partner.total}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent="Total de Clientes"
                color="dark"
                size="xs"
                container
                sx={{ ml: 1, height: "2rem" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MDBox display="flex" my={2} mx={{ xs: "10vw", sm: "15vw", md: 0 }}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth="100px"
              >
                {stats.partner.active}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent="Clientes Activos"
                color="success"
                size="xs"
                container
                sx={{ ml: 1, height: "2rem" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={4} mx={{ xs: "10vw", sm: "15vw", md: 0 }}>
            <MDBox display="flex" my={2}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth="100px"
              >
                {stats.partner.inactive}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent="Clientes inactivos"
                color="error"
                size="xs"
                container
                sx={{ ml: 1, height: "2rem", width: "200px" }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <Grid container>
          <Grid item xs={12} lg={4}>
            <MDBox display="flex" my={2} mx={{ xs: "10vw", sm: "15vw", md: 0 }}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth="100px"
              >
                {stats.contact.total}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent="Total de Contactos"
                color="dark"
                size="xs"
                container
                sx={{ ml: 1, height: "2rem", width: "200px" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MDBox display="flex" my={2} mx={{ xs: "10vw", sm: "15vw", md: 0 }}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth="100px"
              >
                {stats.contact.active}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent="Contactos Activos"
                color="success"
                size="xs"
                container
                sx={{ ml: 1, height: "2rem", width: "200px" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MDBox display="flex" my={2} mx={{ xs: "10vw", sm: "15vw", md: 0 }}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth="100px"
              >
                {stats.contact.inactive}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent="Contactos inactivos"
                color="error"
                size="xs"
                container
                sx={{ ml: 1, height: "2rem", width: "200px" }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
