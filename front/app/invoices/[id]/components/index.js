"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import MDBox from "/components/MDBox";
import Detail from "./detail/index";
import Payments from "./payments/index";
import Tabs from "./tabs";
import { DataProvider } from "/providers/DataProvider";
import { useState } from "react";

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
          <TabPanel value="payments">
            <Payments />
          </TabPanel>
          <TabPanel value="credit_notes">{/* TODO credit notes */}</TabPanel>
          <TabPanel value="tasks">{/* TODO tasks */}</TabPanel>
        </TabContext>
      </MDBox>
    </DataProvider>
  );
}
