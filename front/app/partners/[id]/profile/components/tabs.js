"use client";

import { AppBar, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import breakpoints from "/assets/theme/base/breakpoints";

export default function TabsComponent() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

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

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <AppBar position="static">
      <Tabs
        value={tabValue}
        orientation={tabsOrientation}
        onChange={handleSetTabValue}
      >
        <Tab label="Detalles del cliente" />
        <Tab label="Campos personalizados" />
        <Tab label="Envío de factura" />
        <Tab label="Comercial" />
      </Tabs>
    </AppBar>
  );
}
