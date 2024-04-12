/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";

// NextJS Material Dashboard 2 PRO examples
import SidenavCollapse from "/examples/Sidenav/SidenavCollapse";
import SidenavList from "/examples/Sidenav/SidenavList";
import SidenavItem from "/examples/Sidenav/SidenavItem";

// Custom styles for the Sidenav
import SidenavRoot from "/examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "/examples/Sidenav/styles/sidenav";

import { useSession, signOut } from "next-auth/react";

// NextJS Material Dashboard 2 PRO context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "/context";
import { Skeleton } from "@mui/material";
import { usePathname } from "next/navigation";

function Sidenav({
  color = "dark",
  brand = "Velo Legal",
  brandName,
  routes,
  ...rest
}) {
  const { data: session, status } = useSession();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const pathname = usePathname();
  const collapseName = pathname.split("/").slice(1)[0];
  const items = pathname.split("/").slice(1);
  const itemParentName = items[0];
  const itemName = items[items.length - 1];
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const isChildSectionOpen = (collapse = []) =>
    collapse.some((item) => item.key === itemName);

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  // Check if the session is expired and force sign in
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1400);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1400 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1400 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key }) => (
      <MuiLink href={route} key={key} sx={{ textDecoration: "none" }}>
        <SidenavItem name={name} active={route === pathname} nested />
      </MuiLink>
    ));

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, key }) => {
      let returnValue;
      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            active={key === itemParentName ? "isParent" : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }) =>
              openNestedCollapse === key &&
              currentTarget.classList.contains("MuiListItem-root")
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = route ? (
          <Link href={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem color={color} name={name} active={key === itemName} />
          </Link>
        ) : (
          <SidenavItem
            color={color}
            name={name}
            active={key === itemName}
            onClick={() => signOut()}
          />
        );
      }

      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, route }) => {
      let returnValue;
      if (type === "collapse") {
        if (noCollapse && route) {
          returnValue = (
            <Link href={route} key={key} passHref>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </Link>
          );
        } else {
          if (key === "profile-user") {
            if (status === "loading") {
              returnValue = (
                <MDBox
                  key={"loader-user-profile"}
                  display="flex"
                  alignItems="center"
                >
                  <Skeleton
                    variant="circular"
                    sx={{ ml: 4, mr: 2 }}
                    width={36}
                    height={36}
                  />
                  <Skeleton variant="rectangular" width={122} height={36} />
                </MDBox>
              );
            } else {
              returnValue = (
                <SidenavCollapse
                  key={key}
                  name={session?.user.name ?? "Guest"}
                  icon={
                    session ? (
                      <MDAvatar
                        src={session.user.image}
                        alt={session.user.name}
                        size="sm"
                      />
                    ) : (
                      icon
                    )
                  }
                  active={key === collapseName}
                  open={openCollapse === key}
                  onClick={() =>
                    openCollapse === key
                      ? setOpenCollapse(false)
                      : setOpenCollapse(key)
                  }
                >
                  {collapse ? renderCollapse(collapse) : null}
                </SidenavCollapse>
              );
            }
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                active={key === collapseName || isChildSectionOpen(collapse)}
                open={openCollapse === key || isChildSectionOpen(collapse)}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        }
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
      sx={{ displayPrint: "none" }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <Link href="/">
          <MDBox display="flex" alignItems="center">
            {brand && brand.src ? (
              <MDBox
                component="img"
                src={brand.src}
                alt={brandName}
                width="11rem"
              />
            ) : (
              brand
            )}
            <MDBox
              width={!brandName && "100%"}
              sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
            ></MDBox>
          </MDBox>
        </Link>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
