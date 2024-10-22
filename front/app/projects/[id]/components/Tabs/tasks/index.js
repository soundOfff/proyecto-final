"use client";

import { useDataProvider } from "/providers/DataProvider";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Table from "/components/Tasks/table-client";
import MDBox from "/components/MDBox";
import Stats from "./components/stats";
import KanbanIndex from "./components/kanban";
import { useState } from "react";
import {
  TableRows,
  ViewKanban,
  ViewList as ViewListIcon,
  ViewModule,
} from "@mui/icons-material";

export default function Tasks() {
  const { project } = useDataProvider();
  const [isTableView, setIsTableView] = useState(true);

  return (
    <MDBox>
      <Stats />
      <MDBox ml={1}>
        <ToggleButtonGroup
          value={isTableView}
          color="dark"
          exclusive
          onChange={(e, newValue) => setIsTableView(newValue)}
          size="large"
        >
          <ToggleButton value={true}>
            <TableRows />
          </ToggleButton>
          <ToggleButton value={false}>
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
      </MDBox>
      <Grid container>
        <Grid item xs={12}>
          <MDBox py={1}>
            {isTableView ? <Table project={project} /> : <KanbanIndex />}
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
