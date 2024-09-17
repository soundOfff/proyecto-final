import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

export function StatBox({ label, count, color, xs = 12, lg = 4 }) {
  return (
    <Grid item xs={xs} lg={lg}>
      <MDBox
        display="flex"
        my={0.5}
        mx={{ xs: "10vw", sm: "15vw", md: 0 }}
        gap={0.5}
      >
        <MDTypography
          variant="h6"
          display="inline-block"
          minWidth="45px"
          textAlign="end"
        >
          {count}
        </MDTypography>
        <MDBadge
          variant="contained"
          badgeContent={label}
          color={color}
          size="xs"
          container
          sx={{ ml: 1, height: "2rem" }}
        />
      </MDBox>
    </Grid>
  );
}

export default function Stats({ stats }) {
  return (
    <Grid container sx={{ mx: { xs: 0, sm: 2 } }}>
      <Grid item xs={12} md={6} lg={12}>
        <Grid container>
          <StatBox
            label="Total de Clientes"
            count={stats.partner.total}
            color="dark"
          />
          <StatBox
            label="Clientes Activos"
            count={stats.partner.active}
            color="success"
          />
          <StatBox
            label="Clientes Inactivos"
            count={stats.partner.inactive}
            color="error"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <Grid container>
          <StatBox
            label="Total de Contactos"
            count={stats.contact.total}
            color="dark"
          />
          <StatBox
            label="Contactos Activos"
            count={stats.contact.active}
            color="success"
          />
          <StatBox
            label="Contactos Inactivos"
            count={stats.contact.inactive}
            color="error"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
