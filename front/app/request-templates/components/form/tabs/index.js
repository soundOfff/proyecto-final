"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import MDBox from "/components/MDBox";

import Tabs from "./tabs";
import Table from "../table";

import { useState } from "react";
import FormInfo from "../form-info";

export default function Index({ formData }) {
  const [tab, setTab] = useState("fields");

  return (
    <MDBox>
      <TabContext value={tab}>
        <MDBox my={2}>
          <Tabs setTabIndex={setTab} />
        </MDBox>
        <TabPanel value="fields">
          <Table formData={formData} />
        </TabPanel>
        <TabPanel value="information">
          <FormInfo />
        </TabPanel>
      </TabContext>
    </MDBox>
  );
}
