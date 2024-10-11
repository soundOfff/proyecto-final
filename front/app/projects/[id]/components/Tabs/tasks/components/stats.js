import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDBadge from "/components/MDBadge";
import { getCountByStatuses } from "/actions/tasks";
import { useDataProvider } from "/providers/DataProvider";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getColor } from "/utils/project-state-colors";

export default function Stats() {
  const [stats, setStats] = useState(null);

  const { project } = useDataProvider();

  useEffect(() => {
    getCountByStatuses({
      project_id: project.id,
    }).then((data) => setStats(data));
  }, [project]);

  return (
    <Grid container>
      {stats &&
        stats.length > 0 &&
        stats.map((item) => (
          <Grid
            item
            key={`stats-${item.id}`}
            margin="auto"
            minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
          >
            <MDBox my={2}>
              <MDTypography
                variant="h3"
                display="inline-block"
                minWidth={{ xs: "150px", sm: "auto" }}
              >
                {item.count}
              </MDTypography>
              <MDBadge
                variant="contained"
                badgeContent={item.name}
                color={getColor(item.id)}
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
        ))}
    </Grid>
  );
}
