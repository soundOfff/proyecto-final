"use client";

import brandfactorsIconWhite from "/assets/logo/White/brandfactors.svg";
import brandfactorsIconWhiteMini from "/assets/logo/White/brandfactors-mini.png";
import veloIconWhite from "/assets/logo/White/asset-29.svg";
import veloIconWhiteMini from "/assets/logo/White/velolegal-mini.svg";

import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "/context";

import { usePathname } from "next/navigation";

import { CssBaseline } from "@mui/material";

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

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { BRANDFACTORS } from "/utils/constants/appNames";

export default function Theme(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, openConfigurator, sidenavColor, darkMode } =
    controller;
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
    process.env.NEXT_PUBLIC_APP_NAME === BRANDFACTORS
      ? miniSidenav
        ? brandfactorsIconWhiteMini
        : brandfactorsIconWhite
      : veloIconWhite;

  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: selector === "",
        });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = "";
    let dataEmotionAttribute = registry.cache.key;

    const globals = [];

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles !== "" && (
          <style
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return (
    <CacheProvider value={registry.cache}>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />

        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brandIcon}
              brandName={process.env.NEXT_PUBLIC_APP_NAME}
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {children}
            <Configurator />
            {/* {configsButton} */}
          </>
        )}
        {layout === "vr" && <Configurator />}
      </ThemeProvider>
    </CacheProvider>
  );
}
