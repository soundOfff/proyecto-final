import { Grid, Skeleton } from "@mui/material";

export default function StatsLoading({ quantity = 3 }) {
  return (
    <Grid container>
      {[...new Array(quantity)].map((_, index) => (
        <Grid key={index} item margin="auto" minWidth={{ xs: "30%" }}>
          <Skeleton variant="rounded" width="100%" height={80} />
        </Grid>
      ))}
    </Grid>
  );
}
