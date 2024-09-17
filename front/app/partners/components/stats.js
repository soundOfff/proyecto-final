import { Grid } from "@mui/material";

import StatBox from "/app/components/StatBox";

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
