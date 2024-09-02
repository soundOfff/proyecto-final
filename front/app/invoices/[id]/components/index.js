"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "./tabs";
import MDBox from "/components/MDBox";
import Detail from "./detail/index";
import Payments from "./payments/index";
import Credits from "./credits/index";
import Tasks from "./tasks/index";
import { DataProvider } from "/providers/DataProvider";
import { useState } from "react";

export default function IndexComponent(props) {
  const [tab, setTab] = useState("detail");

  return (
    <DataProvider value={{ ...props }}>
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
          <TabPanel value="credits">
            <Credits />
          </TabPanel>
          <TabPanel value="tasks">
            <Tasks />
          </TabPanel>
        </TabContext>
      </MDBox>
    </DataProvider>
  );
}
