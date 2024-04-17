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

export default function IndexComponent({ project, staffs }) {
  const [tab, setTab] = useState("description");

  return (
    <MDBox>
      <TabContext value={tab}>
        <MDBox my={2}>
          <Tabs setTabIndex={setTab} />
        </MDBox>
        <Card sx={{ p: 2 }}>
          <TabPanel value="description">
            <Header project={project} />
            <Details project={project} staffs={staffs} />
          </TabPanel>
          <TabPanel value="tasks">
            <Tasks project={project} />
          </TabPanel>
          <TabPanel value="timers">
            <Timers project={project} />
          </TabPanel>
          <TabPanel value="files">
            <Files project={project} />
          </TabPanel>
          <TabPanel value="estimates">
            <Estimates project={project} />
          </TabPanel>
          <TabPanel value="invoices">
            <Invoices project={project} />
          </TabPanel>
          <TabPanel value="expenses">
            <Expenses project={project} />
          </TabPanel>
        </Card>
      </TabContext>
    </MDBox>
  );
}
