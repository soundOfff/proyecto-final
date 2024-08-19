"use client";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDBadge from "/components/MDBadge";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
} from "/examples/Sidenav/styles/sidenavCollapse";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController } from "/context";
import { useCallback, useEffect, useState } from "react";

import { getIsNotSeenCount } from "/actions/notifications";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function SidenavCollapse({
  icon,
  name,
  children = false,
  active = false,
  noCollapse = false,
  open = false,
  ...rest
}) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;

  const [isNotSeenCount, setIsNotSeenCount] = useState(0);

  const { data: session } = useSession();

  const pathname = usePathname();

  const renderListItemIcon = () => {
    return (
      <ListItemIcon
        sx={(theme) =>
          collapseIconBox(theme, {
            transparentSidenav,
            whiteSidenav,
            darkMode,
          })
        }
      >
        {typeof icon === "string" ? (
          <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
        ) : (
          icon
        )}
      </ListItemIcon>
    );
  };

  const fetchIsNotSeenCount = useCallback(async () => {
    if (session && session.staff) {
      const count = await getIsNotSeenCount({ staff_id: session.staff.id });
      setIsNotSeenCount(count);
    }
  }, [session]);

  useEffect(() => {
    if (name === "Notificaciones") {
      fetchIsNotSeenCount();
    }
  }, [name, session, fetchIsNotSeenCount]);

  useEffect(() => {
    if (pathname === "/notificaciones") {
      setIsNotSeenCount(0);
    } else {
      fetchIsNotSeenCount();
    }
  }, [pathname, fetchIsNotSeenCount]);

  return (
    <>
      <ListItem component="li">
        <MDBox
          {...rest}
          sx={(theme) =>
            collapseItem(theme, {
              active,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          {name === "Notificaciones" && isNotSeenCount !== 0 ? (
            <MDBadge
              badgeContent={isNotSeenCount}
              color="error"
              size="xs"
              circular
            >
              {renderListItemIcon()}
            </MDBadge>
          ) : (
            renderListItemIcon()
          )}

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />

          <Icon
            sx={(theme) =>
              collapseArrow(theme, {
                noCollapse,
                transparentSidenav,
                whiteSidenav,
                miniSidenav,
                open,
                active,
                darkMode,
              })
            }
          >
            expand_less
          </Icon>
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};
