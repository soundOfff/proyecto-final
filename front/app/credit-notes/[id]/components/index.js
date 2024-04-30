"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "./tabs";
import MDBox from "/components/MDBox";
import Detail from "./detail/index";
import Invoices from "./invoices/index";
import { DataProvider } from "/providers/DataProvider";
import { useState } from "react";

export default function IndexComponent({ creditNote }) {
  const [tab, setTab] = useState("detail");

  return (
    <DataProvider value={{ creditNote }}>
      <MDBox>
        <TabContext value={tab}>
          <MDBox my={2}>
            <Tabs setTabIndex={setTab} />
          </MDBox>
          <TabPanel value="detail">
            <Detail />
          </TabPanel>
          <TabPanel value="invoices">
            <Invoices />
          </TabPanel>
        </TabContext>
      </MDBox>
    </DataProvider>
  );
}
