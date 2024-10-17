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
import Notes from "./Tabs/notes";
import Estimates from "./Tabs/estimates";
import Invoices from "./Tabs/invoices";
import Expenses from "./Tabs/expenses";
import { DataProvider } from "/providers/DataProvider";
import { useSearchParams } from "next/navigation";
import ProjectTasksKanban from "./Tabs/kanban";

export default function IndexComponent(props) {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get("tab") || "description";
  const [tab, setTab] = useState(initialTab);

  return (
    <DataProvider value={{ ...props }}>
      <MDBox>
        <TabContext value={tab}>
          <MDBox my={1}>
            <Tabs setTabIndex={setTab} />
          </MDBox>
          <Card sx={{ p: 1 }}>
            <TabPanel value="description">
              <Header />
              <Details />
            </TabPanel>
            <TabPanel value="tasks" sx={{ padding: "12px" }}>
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
            <TabPanel value="notes">
              <Notes />
            </TabPanel>
            <TabPanel value="kanban">
              <ProjectTasksKanban />
            </TabPanel>
          </Card>
        </TabContext>
      </MDBox>
    </DataProvider>
  );
}
