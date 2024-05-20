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

import Link from "next/link";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { usePathname } from "next/navigation";

import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import translate from "/locales/es/common.json";
import { matchedRoutes } from "../../utils/constants/matchedRoutes";

function Breadcrumbs({ icon, title, route, light = false }) {
  const pathname = usePathname();
  const segments = route.slice(0, -1).filter((el) => el.length > 0);
  const pathRoutes = pathname.split("/").filter((el) => el.length > 0);

  const getPageTitle = () =>
    "Velo CRM - " +
    pathRoutes
      .filter((el) => !el.match(/\d+/))
      .map((el) => translate[el] ?? el)
      .join(" / ");

  const getMatchedUrl = (route) => {
    if (route.match(/\d+/)) {
      const routeIdx = pathRoutes.findIndex((el) => el === route);
      const prevMatchedRoute = pathRoutes[routeIdx - 1];
      return `/${prevMatchedRoute}/${route}`;
    }
    return `${matchedRoutes[route] ?? route}`;
  };

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <title>{getPageTitle()}</title>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey[600],
          },
        }}
      >
        <Link href="/">
          <MDTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>
        {segments.map((el) => (
          <Link href={getMatchedUrl(el)} key={el}>
            <MDTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {translate[el] ?? el}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
