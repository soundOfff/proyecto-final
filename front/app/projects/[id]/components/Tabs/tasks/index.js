"use client";

import { useDataProvider } from "/providers/DataProvider";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Table from "/components/Tasks/table-client";
import MDBox from "/components/MDBox";
import Stats from "./components/stats";
import Kanban from "./components/Kanban/kanban";
import SelectedPathChart from "./components/SelectedPathChart/";
import { useState } from "react";
import { AccountTree, TableRows, ViewModule } from "@mui/icons-material";

const MODES = {
  TABLE: "table",
  KANBAN: "kanban",
  FLOW_CHART: "flow_chart",
};

export default function Tasks() {
  const [mode, setMode] = useState(MODES.TABLE);
  const { project } = useDataProvider();

  return (
    <MDBox>
      <Stats />
      <MDBox ml={1}>
        <ToggleButtonGroup
          value={mode}
          color="dark"
          exclusive
          onChange={(e, newValue) => setMode(newValue)}
          size="large"
        >
          <ToggleButton value={MODES.TABLE}>
            <TableRows />
          </ToggleButton>
          <ToggleButton value={MODES.KANBAN}>
            <ViewModule />
          </ToggleButton>
          <ToggleButton value={MODES.FLOW_CHART}>
            <AccountTree />
          </ToggleButton>
        </ToggleButtonGroup>
      </MDBox>
      <Grid container>
        <Grid item xs={12}>
          <MDBox py={1}>
            {mode === MODES.TABLE && <Table project={project} />}
            {mode === MODES.KANBAN && <Kanban />}
            {mode === MODES.FLOW_CHART && (
              <SelectedPathChart
                processId={project?.process?.id}
                tasks={project?.tasks}
              />
            )}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
