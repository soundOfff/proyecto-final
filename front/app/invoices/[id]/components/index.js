"use client";

import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import Tabs from "./tabs";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Detail from "./detail/index";
import { DataProvider } from "/providers/DataProvider";

export default function IndexComponent({ invoice }) {
  const [tab, setTab] = useState("detail");

  return (
    <DataProvider value={{ invoice }}>
      <MDBox>
        <TabContext value={tab}>
          <MDBox my={2}>
            <Tabs setTabIndex={setTab} />
          </MDBox>
          <TabPanel value="detail">
            <Detail />
          </TabPanel>
          <TabPanel value="payments">{/* TODO payments */}</TabPanel>
          <TabPanel value="credit_notes">{/* TODO credit notes */}</TabPanel>
          <TabPanel value="tasks">{/* TODO tasks */}</TabPanel>
        </TabContext>
      </MDBox>
    </DataProvider>
  );
}
