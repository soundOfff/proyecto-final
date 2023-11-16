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
          <MDBox display="flex" alignContent="center" my={2}>
            <MDTypography variant="h3" display="inline-block">
              {status.count}
            </MDTypography>
            <MDBadge
              border
              variant="contained"
              badgeContent={`${status.label}`}
              color={setColor(status.label)}
              size="xs"
              container
              sx={{ ml: 1, height: "2rem" }}
            />
          </MDBox>
        </Grid>
      ))}
    </Grid>
  );
}
