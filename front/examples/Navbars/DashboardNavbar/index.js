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

import { useState, useEffect, useCallback } from "react";

import Link from "next/link";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";

// NextJS Material Dashboard 2 PRO examples
import Breadcrumbs from "/examples/Breadcrumbs";
import NotificationItem from "/examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "/examples/Navbars/DashboardNavbar/styles";

// NextJS Material Dashboard 2 PRO context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
  setCurrentTimer,
} from "/context";

import { usePathname } from "next/navigation";
import { getCurrentTimer } from "/actions/timers";
import { useSession } from "next-auth/react";
import moment, { utc } from "moment";
import numberFormat from "/utils/numberFormat";
import { update as updateTimer } from "/actions/timers";
import translate from "/locales/es/common.json";
import { signOut } from "next-auth/react";

export default function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
    currentTimer,
  } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const route = pathname
    .split("/")
    .slice(1)
    .map((el) => translate[el] ?? el);

  const segments = pathname.split("/");

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const { data: session } = useSession();
  const [addedTime, setAddedTime] = useState(5);
  const [isFetching, setIsFetching] = useState(false);

  const addTime = async () => {
    setIsFetching(true);
    const date = moment(currentTimer.start_time)
      .subtract(addedTime, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");
    await updateTimer(currentTimer.id, {
      start_time: date,
    });
    await refetchCurrentTimer();
    setIsFetching(false);
  };

  const removeTime = async () => {
    setIsFetching(true);

    const currentMinutes = moment
      .duration(moment().diff(currentTimer.start_time))
      .asMinutes();

    const date = moment(currentTimer.start_time)
      .add(addedTime >= currentMinutes ? currentMinutes : addedTime, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");
    await updateTimer(currentTimer.id, {
      start_time: date,
    });
    await refetchCurrentTimer();
    setIsFetching(false);
  };

  const refetchCurrentTimer = useCallback(async () => {
    const refetchCurrentTimer = await getCurrentTimer(session.staff.id, {
      include: "task",
    });
    setCurrentTimer(dispatch, refetchCurrentTimer);
  }, [session, dispatch]);

  const handleAddedTime = (e) => {
    setAddedTime(e.target.value);
  };

  useEffect(() => {
    if (!currentTimer && session) {
      refetchCurrentTimer();
    }
  }, [session, currentTimer, refetchCurrentTimer]);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const getTimeTaken = () => {
    if (currentTimer) {
      return moment
        .utc(moment().diff(currentTimer.start_time))
        .format("HH:mm:ss");
    }
  };

  useEffect(() => {
    if (currentTimer) {
      const interval = setInterval(() => {
        setCurrentTimer(dispatch, currentTimer);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentTimer, dispatch]);

  const stopTimer = async () => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    await updateTimer(currentTimer.id, { end_time: date });
    await refetchCurrentTimer();
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {currentTimer ? (
        <MDBox
          p={2}
          display="flex"
          gap={0.5}
          flexDirection="column"
          lineHeight={1}
        >
          <MDBox>
            <MDTypography variant="h6" fontWeight="medium">
              Tarea:{" "}
              <Link href={`/tasks?${currentTimer.task.id}`}>
                {currentTimer.task.name}
              </Link>
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography
              variant="h6"
              fontWeight="medium"
              display="inline"
              mr={1}
            >
              Tiempo Transcurrido:
            </MDTypography>
            <MDTypography variant="body2" display="inline">
              {getTimeTaken()}
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            alignContent="center"
            mb={2}
          >
            <MDTypography
              variant="h6"
              fontWeight="medium"
              display="inline"
              mr={1}
              mb={0.5}
            >
              Agregar minutos
            </MDTypography>
            <MDBox
              display="flex"
              alignContent="center"
              justifyContent="center"
              gap={2}
            >
              <MDButton
                variant="gradient"
                color="primary"
                size="small"
                disabled={isFetching}
                onClick={removeTime}
              >
                Quitar
                <Icon>remove</Icon>
              </MDButton>
              <MDInput
                value={numberFormat(addedTime)}
                onChange={(e) => handleAddedTime(e)}
                placeholder="Tiempo en minutos"
                disabled={isFetching}
                size="small"
                type="number"
              />
              <MDButton
                variant="gradient"
                color="success"
                disabled={isFetching}
                size="small"
                onClick={addTime}
              >
                Agregar
                <Icon>add</Icon>
              </MDButton>
            </MDBox>
          </MDBox>
          <MDButton variant="gradient" color="error" onClick={stopTimer}>
            Detener Temporizador
          </MDButton>
        </MDBox>
      ) : (
        <NotificationItem title="No se encontraron temporizadores corriendo" />
      )}
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
      className="display-hidden-print"
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={segments}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox
              color={light ? "white" : "inherit"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleMiniSidenav}
                aria-label="toggle-sidebar"
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <Link href="/profile" passHref legacyBehavior>
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <MDBadge
                  badgeContent={currentTimer ? 1 : 0}
                  color="error"
                  size="xs"
                  circular
                >
                  <Icon sx={iconsStyle}>access_time</Icon>
                </MDBadge>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={() => signOut()}
                aria-label="logout"
              >
                <Icon sx={iconsStyle}>logout</Icon>
              </IconButton>
            </MDBox>
            {renderMenu()}
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
