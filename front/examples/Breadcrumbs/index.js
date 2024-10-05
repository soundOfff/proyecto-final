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
import PropTypes from "prop-types";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { usePathname } from "next/navigation";
import Icon from "@mui/material/Icon";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import translate from "/locales/es/common.json";
import { matchedRoutes } from "../../utils/constants/matchedRoutes";
import useCaseName from "../../hooks/useCaseName";

function Breadcrumbs({ icon, title, route, light = false }) {
  const pathname = usePathname();
  const segments = route.slice(0, -1).filter((el) => el.length > 0);
  const pathRoutes = pathname.split("/").filter((el) => el.length > 0);

  // Obtener el ID del caso de la ruta
  const caseId = pathRoutes.find((el) => el.match(/\d+/));
  const { caseName, loading } = useCaseName(caseId);

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
    <MDBox mr={{ xs: 0, xl: 8 }} sx={{ width: "100%" }}>
      <title>{getPageTitle()}</title>
      <MuiBreadcrumbs
        sx={{
          maxWidth: "800px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "inline-block",
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
          sx={{
            lineHeight: 0,
          }}
        >
          {segments[0] === "projects" ? caseName : title.replace("-", " ")}
        </MDTypography>
      </MuiBreadcrumbs>
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
