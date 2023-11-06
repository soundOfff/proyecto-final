"use client";

import { ThemeProvider } from "@mui/material/styles";

import logoWhite from "/assets/logo/White/asset-29.svg";
import logoDark from "/assets/logo/Black/asset-27.svg";

import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "/context";
import { usePathname } from "next/navigation";

import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

// NextJS Material Dashboard 2 PRO examples
import Sidenav from "/examples/Sidenav";
import Configurator from "/examples/Configurator";

// NextJS Material Dashboard 2 PRO themes
import theme from "/assets/theme";

// NextJS Material Dashboard 2 PRO Dark Mode themes
import themeDark from "/assets/theme-dark";

// NextJS Material Dashboard 2 PRO routes
import routes from "/routes";

import { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";

import createCache from "@emotion/cache";

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

export default function Theme({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const pathname = usePathname();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const brandIcon =
    (transparentSidenav && !darkMode) || whiteSidenav ? logoDark : logoWhite;

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />

        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brandIcon}
              brandName="Velo Legal"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {children}
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
      </ThemeProvider>
    </CacheProvider>
  );
}
