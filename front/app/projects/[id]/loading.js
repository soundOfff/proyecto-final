import { Card, Divider, Grid, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Card sx={{ px: 10, py: 5 }}>
      <Grid container mt={3} mb={5} lineHeight={0}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" height="2.5rem" width="100%" />
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="end">
          <Skeleton variant="rectangular" width={120} height={40} mr={5} />
          <Skeleton variant="rectangular" width={120} height={40} />
        </Grid>
      </Grid>

      <Grid container ml={2}>
        <Grid item xs={12} md={6} xxl={3} whiteSpace="nowrap">
          <Skeleton variant="rectangular" width={120} height={100} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 0, xs: 3 }}
          whiteSpace="nowrap"
        >
          <Skeleton variant="rectangular" width={120} height={100} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 3, xs: 3 }}
          whiteSpace="nowrap"
        >
          <Skeleton variant="rectangular" width={120} height={100} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 3, xs: 3 }}
          whiteSpace="nowrap"
        >
          <Skeleton variant="rectangular" width={120} height={100} />
        </Grid>
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <Skeleton variant="rectangular" width="80%" height={100} />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <Skeleton variant="rectangular" width="80%" height={100} />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <Skeleton variant="rectangular" width="80%" height={100} />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <Skeleton variant="rectangular" width="80%" height={100} />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <Skeleton variant="rectangular" width="80%" height={100} />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <Skeleton variant="rectangular" width="80%" height={100} />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} mt={3}>
          <Skeleton variant="rectangular" width="100%" height="140px" />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} mt={3}>
          <Skeleton variant="rectangular" width="100%" height="140px" />
        </Grid>
      </Grid>
    </Card>
  );
}
