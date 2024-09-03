import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

import { Grid } from "@mui/material";

import { setColor } from "/utils/project-state-colors";

export default function Stats({ countByStatuses }) {
  return (
    <Grid container>
      {countByStatuses.map((status) => (
        <Grid
          item
          key={status.label}
          margin="auto"
          minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
        >
          <MDBox my={2}>
            <MDTypography
              variant="h4"
              display="inline-block"
              minWidth={{ xs: "150px", sm: "auto" }}
            >
              {status.count}
            </MDTypography>
            {
              <MDBadge
                variant="contained"
                badgeContent={`${status.label}`}
                color={setColor(status.label)}
                size="xs"
                container
                sx={{
                  ml: { xs: 0, sm: 2 },
                  mb: 1,
                  height: "2rem",
                  minWidth: "108px",
                }}
              />
            }
          </MDBox>
        </Grid>
      ))}
    </Grid>
  );
}
