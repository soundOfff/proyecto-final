import { Grid } from "@mui/material";

import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";

export default function StatBox({ label, count, color, xs = 12, sm = 6, md = 4, lg = 4 }) {
  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      margin="auto"
      minWidth={{ xs: "150px", sm: "160px", md: "8%" }}
    >
      <MDBox
        display="flex items-start"
        gap={0.5}
        my={0.5}
        mx={{ xs: "10vw", sm: "15vw", md: 0 }}
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
          sx={{
            ml: { xs: 0.5, sm: 1 },
            mb: 0,
            height: "1.5rem",
            minWidth: "70px",
          }}
        />
      </MDBox>
    </Grid>
  );
}
