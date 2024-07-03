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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import Link from "next/link";

function Row({ name, slug, disabled, id }) {
  return (
    <MDBox key={id} component="li" pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox display="flex" flexDirection="column" justifyContent="center">
            <Link href={`/mail-templates/${id}`}>
              <MDTypography
                variant="button"
                fontWeight="medium"
                color="info"
                gutterBottom
              >
                {name}
              </MDTypography>
            </Link>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {slug}
            </MDTypography>
          </MDBox>
        </MDBox>
        <FormGroup>
          <FormControlLabel control={<Switch checked={disabled} />} />
        </FormGroup>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props of the Transaction
Row.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  key: PropTypes.number.isRequired,
};

export default Row;
