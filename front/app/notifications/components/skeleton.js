import { Box, Card, Divider, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function Loading({ count = 3 }) {
  return (
    <Box mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            {Array.from({ length: count }).map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton variant="rectangle" width="100%" height="60px" />
                <Divider />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
