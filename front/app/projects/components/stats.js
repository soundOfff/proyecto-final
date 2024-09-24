import { Grid } from "@mui/material";

import StatBox from "/app/components/StatBox";
import { setColor } from "/utils/project-state-colors";

export default function Stats({ countByStatuses }) {
  return (
    <Grid container>
      {countByStatuses.map((status) => (
        <StatBox
          key={status.label}
          label={status.label}
          count={status.count}
          color={setColor(status.label)}
          xs={2}
          lg={2}
        />
      ))}
    </Grid>
  );
}
