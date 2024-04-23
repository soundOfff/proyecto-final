"use client";

import { AppBar, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import { useEffect, useState } from "react";
import breakpoints from "/assets/theme/base/breakpoints";

export default function TabsComponent({ setTabIndex }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
       The event listener that's calling the handleTabsOrientation function when resizing the window.
      */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabIndex(newValue);

  return (
    <AppBar position="static">
      <TabList orientation={tabsOrientation} onChange={handleSetTabValue}>
        <Tab label="Detalle" value="detail" />
        <Tab label="Cobros" value="payments" />
        <Tab label="Notas de Crédito" value="credit_notes" />
        <Tab label="Tareas" value="tasks" />
      </TabList>
    </AppBar>
  );
}
