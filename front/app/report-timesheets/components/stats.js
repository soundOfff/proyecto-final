import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import numberFormat from "/utils/numberFormat";

import { Grid } from "@mui/material";

export default function Stats({ totalTime, totalWeekTime, totalMonthTime }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={4} md={4}>
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={2}
        >
          <MDTypography
            variant="h5"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
          >
            {`${numberFormat(totalTime)} hs`}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Tiempo total registrado"
            color="info"
            size="xs"
            container
            sx={{
              ml: 2,
              height: "2rem",
              minWidth: "100px",
            }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={2}
        >
          <MDTypography
            variant="h5"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
          >
            {`${numberFormat(totalMonthTime)} hs`}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Tiempo total registrado mes actual"
            color="primary"
            size="xs"
            container
            sx={{
              ml: 2,
              height: "2rem",
              minWidth: "100px",
            }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={2}
        >
          <MDTypography
            variant="h5"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
          >
            {`${numberFormat(totalWeekTime)} hs`}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Tiempo total registrado semana actual"
            color="warning"
            size="xs"
            container
            sx={{
              ml: 2,
              height: "2rem",
              minWidth: "100px",
            }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}
