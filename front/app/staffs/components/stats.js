import { Card, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

export default function Stats({
  data: { pendingTasks, inProgressTasks, completedTasks },
}) {
  return (
    <Card
      sx={{
        width: "100%",
        padding: "10px",
        margin: "20px",
        md: { margin: "20px 0 20px 0" },
      }}
    >
      <Grid container sx={{ mx: { xs: 0, sm: 5 } }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                my={2}
                mx={{ xs: "10vw", sm: "15vw", md: 0 }}
              >
                <MDTypography
                  variant="h3"
                  display="inline-block"
                  minWidth="40px"
                >
                  {pendingTasks}
                </MDTypography>
                <MDBadge
                  variant="contained"
                  badgeContent="Total de tareas pendientes"
                  color="primary"
                  size="xs"
                  container
                  sx={{ ml: 1, height: "2rem" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                my={2}
              >
                <MDTypography
                  variant="h3"
                  display="inline-block"
                  minWidth="40px"
                >
                  {inProgressTasks}
                </MDTypography>
                <MDBadge
                  variant="contained"
                  badgeContent="Total de tareas en progreso"
                  color="info"
                  size="xs"
                  container
                  sx={{ ml: 1, height: "2rem" }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                my={2}
              >
                <MDTypography
                  variant="h3"
                  display="inline-block"
                  minWidth="40px"
                >
                  {completedTasks}
                </MDTypography>
                <MDBadge
                  variant="contained"
                  badgeContent="Total de tareas completadas"
                  color="success"
                  size="xs"
                  container
                  sx={{ ml: 1, height: "2rem", width: "200px" }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
