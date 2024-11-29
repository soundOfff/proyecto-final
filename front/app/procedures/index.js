"use client";

import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AccountTree, TableRows } from "@mui/icons-material";

import CreateChart from "./components/create-chart/";
import Table from "./components/table";
import MDBox from "/components/MDBox";

import { useState } from "react";

const MODES = {
  TABLE: "table",
  FLOW_CHART: "flow_chart",
};

export default function Index({ procedures, actionTypes, processId }) {
  const [mode, setMode] = useState(MODES.TABLE);
  return (
    <Grid item xs={12}>
      <MDBox px={5} py={2}>
        <ToggleButtonGroup
          value={mode}
          color="dark"
          exclusive
          onChange={(_, newValue) => setMode(newValue)}
          size="large"
        >
          <ToggleButton value={MODES.TABLE}>
            <TableRows />
          </ToggleButton>
          <ToggleButton value={MODES.FLOW_CHART}>
            <AccountTree />
          </ToggleButton>
        </ToggleButtonGroup>
      </MDBox>
      <MDBox py={1}>
        {mode === MODES.TABLE && (
          <Table
            procedures={procedures}
            actionTypes={actionTypes}
            processId={processId}
          />
        )}
        {mode === MODES.FLOW_CHART && <CreateChart processId={processId} />}
      </MDBox>
    </Grid>
  );
}
