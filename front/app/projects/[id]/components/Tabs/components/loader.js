"use client";

import { Skeleton } from "@mui/material";

export default function Loader() {
  return (
    <>
      <Skeleton variant="rectangle" width="100%" height="10vh" sx={{ mb: 2 }} />
      <Skeleton variant="rectangle" width="100%" height="10vh" sx={{ mb: 2 }} />
      <Skeleton variant="rectangle" width="100%" height="10vh" sx={{ mb: 2 }} />
      <Skeleton variant="rectangle" width="100%" height="10vh" sx={{ mb: 2 }} />
    </>
  );
}
