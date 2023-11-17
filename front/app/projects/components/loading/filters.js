import { Grid, Skeleton } from "@mui/material";

export default function FiltersLoading() {
  return (
    <Grid container spacing={3} my={3}>
      <Grid item xs={12} sm={4}>
        <Skeleton
          variant="rounded"
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "45px",
            mb: 3,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Skeleton
          variant="rounded"
          sx={{
            width: { lg: "80%", xs: "100%" },
            height: "50px",
            mb: 3,
            display: "flex",
            justifyItems: "end",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Skeleton
          variant="rounded"
          sx={{
            width: { xl: "10rem", sm: "100%" },
            height: "50px",
            mb: 3,
            ml: { xl: 20, sm: 0 },
          }}
        />
      </Grid>
    </Grid>
  );
}
