import { Grid } from "@mui/material";
import Header from "./show/header";
import Content from "./show/content";
import Aside from "./show/aside";
import MDBox from "/components/MDBox";
import { useDataProvider } from "/providers/DataProvider";

export default function Show() {
  const { task, getSelectedFork } = useDataProvider();
  const selectedFork = task.isFinalTask
    ? getSelectedFork(task.procedure.process.forks)
    : null;
  return (
    <MDBox>
      <Header />
      <Grid container wrap="nowrap">
        <Content selectedFork={selectedFork} />
        <Aside />
      </Grid>
    </MDBox>
  );
}
