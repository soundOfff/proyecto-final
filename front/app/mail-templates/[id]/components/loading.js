import { Box, Card, Divider, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function Loading({ count = 3 }) {
  return (
    <Grid container spacing={1} p={1}>
      <Grid item xs={12}>
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton variant="rectangle" width="100%" height="30px" />
            <Divider />
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
}
