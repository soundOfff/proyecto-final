"use client";

import { AppBar, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import { useEffect, useState } from "react";
import breakpoints from "/assets/theme/base/breakpoints";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TabsComponent({ setTabIndex }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const handleSetTabValue = (event, newValue) => {
    setTabIndex(newValue);

    // update the url with the new tab value
    const params = new URLSearchParams(searchParams);
    params.delete("tab");
    params.set("tab", newValue);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AppBar position="static">
      <TabList orientation={tabsOrientation} onChange={handleSetTabValue}>
        <Tab label="Descripción" value="description" />
        <Tab label="Tareas" value="tasks" />
        <Tab label="Tiempos" value="timers" />
        <Tab label="Archivos" value="files" />
        <Tab label="Proformas" value="estimates" />
        <Tab label="Facturas" value="invoices" />
        <Tab label="Gastos" value="expenses" />
      </TabList>
    </AppBar>
  );
}
