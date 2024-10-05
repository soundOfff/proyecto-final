import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function ShowLoader() {
  const increaseSize = (size) => size + size * 2;
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 999,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "25%",
          height: "25%",
          position: "relative",
        }}
      >
        {/* First skeleton with increased size */}
        <Skeleton
          sx={{
            position: "absolute",
            left: "10%",
            top: "5%",
            width: increaseSize(269),
            height: increaseSize(38),
          }}
          variant="rectangular"
        />

        {/* Remaining skeletons with original sizes */}
        <Skeleton
          sx={{
            position: "absolute",
            left: "10%",
            top: "25%",
            width: "40%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "50%",
            top: "25%",
            width: "40%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "10%",
            top: "45%",
            width: "85%",
            height: "30%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "80%",
            top: "2%",
            width: "20%",
            height: "95%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "10%",
            top: "80%",
            width: "10%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "25%",
            top: "80%",
            width: "10%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "40%",
            top: "80%",
            width: "10%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "55%",
            top: "80%",
            width: "10%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "70%",
            top: "80%",
            width: "10%",
            height: "10%",
          }}
          variant="rectangular"
        />
        <Skeleton
          sx={{
            position: "absolute",
            left: "10%",
            top: "95%",
            width: "85%",
            height: "5%",
          }}
          variant="rectangular"
        />
      </Box>
    </Box>
  );
}
