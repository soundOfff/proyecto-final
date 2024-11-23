"use client";
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

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDBadgeDot from "/components/MDBadgeDot";
import PieChart from "/examples/Charts/PieChart";

let expensesData = {
  labels: [],
  datasets: {
    label: "Payments",
    backgroundColors: ["info", "primary", "dark", "secondary", "success"],
    data: [],
  },
};

function ExpensesChart({ payments }) {
  const labels = payments.map((pay) => pay.label);
  const data = payments.map((pay) => pay.total);

  expensesData.labels = labels;
  expensesData.datasets.data = data;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography variant="h6">Formas de pago</MDTypography>
        <Tooltip title="Ver medios de pago" placement="bottom" arrow>
          <MDButton
            variant="outlined"
            color="secondary"
            size="small"
            circular
            iconOnly
          >
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>
      <MDBox mt={4}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={expensesData} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <MDBox pr={1}>
              {labels.map((label, index) => (
                <MDBox key={index} display="flex" alignItems="center" mb={0.5}>
                  <MDBadgeDot
                    color={expensesData.datasets.backgroundColors[index]}
                    size="sm"
                  />
                  <MDBox ml={1}>
                    <MDTypography variant="caption" color="text">
                      {label}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              ))}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        pt={2}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      >
        <MDBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            Estos son los <strong>5</strong> Medios de pago más utilizados por
            los clientes.
          </MDTypography>
        </MDBox>
        <MDBox
          width={{ xs: "100%", sm: "40%" }}
          textAlign="right"
          mt={{ xs: 2, sm: "auto" }}
        >
          <MDButton color="light">Ver mas</MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ExpensesChart;
