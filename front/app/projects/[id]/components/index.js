"use client";

import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import Header from "./Tabs/description/header";
import Details from "./Tabs/description/details";
import Tabs from "./tabs";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tasks from "./Tabs/tasks";
import Timers from "./Tabs/timers";
import Files from "./Tabs/files";
import Estimates from "./Tabs/estimates";
import Invoices from "./Tabs/invoices";
import Expenses from "./Tabs/expenses";
import { DataProvider } from "/providers/DataProvider";

export default function IndexComponent(props) {
  const [tab, setTab] = useState("description");

  return (
    <DataProvider value={{ ...props }}>
      <MDBox>
        <TabContext value={tab}>
          <MDBox my={2}>
            <Tabs setTabIndex={setTab} />
          </MDBox>
          <Card sx={{ p: 2 }}>
            <TabPanel value="description">
              <Header />
              <Details />
            </TabPanel>
            <TabPanel value="tasks">
              <Tasks />
            </TabPanel>
            <TabPanel value="timers">
              <Timers />
            </TabPanel>
            <TabPanel value="files">
              <Files />
            </TabPanel>
            <TabPanel value="estimates">
              <Estimates />
            </TabPanel>
            <TabPanel value="invoices">
              <Invoices />
            </TabPanel>
            <TabPanel value="expenses">
              <Expenses />
            </TabPanel>
          </Card>
        </TabContext>
      </MDBox>
    </DataProvider>
  );
}
