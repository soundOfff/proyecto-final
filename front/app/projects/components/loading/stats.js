import { Grid, Skeleton } from "@mui/material";
import { STATS_QUANTITY } from "./constants";

export default function StatsLoading() {
  return (
    <Grid container>
      {[...new Array(STATS_QUANTITY)].map((_, index) => (
        <Grid
          key={index}
          item
          margin="auto"
          minWidth={{ xs: "150px", sm: "160px", md: "10%" }}
        >
          <Skeleton variant="rounded" width="100%" height={118} />
        </Grid>
      ))}
    </Grid>
  );
}
