import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import numberFormat from "/utils/numberFormat";

import { Grid } from "@mui/material";

export default function Stats({ totalTime, totalWeekTime, totalMonthTime }) {
  return (
    <Grid container justifyContent="center" wrap="nowrap">
      <Grid item xs={12} sm={4} md={4}>
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          my={2}
        >
          <MDTypography
            variant="h4"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
            sx={{ whiteSpace: "nowrap" }}
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
              ml: { xs: 0, sm: 2 },
              height: "2rem",
              minWidth: "108px",
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
            variant="h4"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
            sx={{ whiteSpace: "nowrap" }}
          >
            {`${numberFormat(totalMonthTime)} hs`}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Tiempo total mes actual"
            color="primary"
            size="xs"
            container
            sx={{
              ml: { xs: 0, sm: 2 },
              height: "2rem",
              minWidth: "108px",
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
            variant="h4"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
            sx={{ whiteSpace: "nowrap" }}
          >
            {`${numberFormat(totalWeekTime)} hs`}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Tiempo total semana actual"
            color="warning"
            size="xs"
            container
            sx={{
              ml: { xs: 0, sm: 2 },
              height: "2rem",
              minWidth: "108px",
            }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}
