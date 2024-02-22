import { Grid } from "@mui/material";
import Header from "./show/header";
import Content from "./show/content";
import Aside from "./show/aside";
import MDBox from "/components/MDBox";

export default function Show({ task }) {
  return (
    <MDBox>
      <Header task={task} />
      <Grid container wrap="nowrap">
        <Content task={task} />
        <Aside task={task} />
      </Grid>
    </MDBox>
  );
}
