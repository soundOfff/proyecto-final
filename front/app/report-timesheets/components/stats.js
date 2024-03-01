import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import numberFormat from "/utils/numberFormat";

import { Grid } from "@mui/material";

export default function Stats({ totalTime, totalWeekTime, totalMonthTime }) {
  return (
    <Grid container>
      <Grid
        item
        key="total-time"
        margin="auto"
        minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
      >
        <MDBox my={2}>
          <MDTypography
            variant="h3"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
          >
            {numberFormat(totalTime)}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Total time"
            color={"info"}
            size="xs"
            container
            sx={{
              ml: { xs: 0, sm: 2 },
              mb: 1,
              height: "2rem",
              minWidth: "108px",
            }}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        key="total-month-time"
        margin="auto"
        minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
      >
        <MDBox my={2}>
          <MDTypography
            variant="h3"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
          >
            {numberFormat(totalMonthTime)}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Total month time"
            color="primary"
            size="xs"
            container
            sx={{
              ml: { xs: 0, sm: 2 },
              mb: 1,
              height: "2rem",
              minWidth: "108px",
            }}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        key="total-week-time"
        margin="auto"
        minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
      >
        <MDBox my={2}>
          <MDTypography
            variant="h3"
            display="inline-block"
            minWidth={{ xs: "150px", sm: "auto" }}
          >
            {numberFormat(totalWeekTime)}
          </MDTypography>
          <MDBadge
            variant="contained"
            badgeContent="Total week time"
            color="primary"
            size="xs"
            container
            sx={{
              ml: { xs: 0, sm: 2 },
              mb: 1,
              height: "2rem",
              minWidth: "108px",
            }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}
