import { Grid } from "@mui/material";
import { setColor } from "/utils/project-state-colors";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

export default function Header({ project }) {
  return (
    <Grid container mt={3} mb={5} lineHeight={0}>
      <Grid item xs={12} md={6}>
        <MDTypography
          variant="h4"
          textAlign="center"
          mr={5}
          display="inline-block"
          mb={{ xs: 5 }}
        >
          {project.name}
        </MDTypography>
      </Grid>

      <Grid item xs={12} md={6} display="flex" justifyContent="end">
        <MDBadge
          variant="gradient"
          color="dark"
          badgeContent={`Expediente ${project.expedient ?? ""}`}
          container
          sx={{ height: "40px", mr: 5 }}
        />
        <MDBadge
          variant="contained"
          badgeContent={`${project.status.label}`}
          color={setColor(project.status.label)}
          container
          sx={{ height: "40px" }}
        />
      </Grid>
    </Grid>
  );
}
