import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Backdrop open={true} sx={{ color: "#fff", zIndex: 9999 }}>
      <CircularProgress size={100} color="black" />
    </Backdrop>
  );
}
