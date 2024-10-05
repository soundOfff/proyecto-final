"use client";

import React from "react";
import MDBox from "/components/MDBox";
import MDBadgeDot from "/components/MDBadgeDot";
import MDButton from "/components/MDButton";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";

import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import DefaultLineChart from "/examples/Charts/LineCharts/DefaultLineChart";
import defaultLineChartData from "/pagesComponents/dashboards/sales/data/defaultLineChartData";

function IncomesChart() {
  const projects = [
    "Proyecto 1",
    "Proyecto 2",
    "Proyecto 3",
    "Proyecto 4",
    "Todos",
  ];

  return (
    <DefaultLineChart
      title={<MDTypography variant="h6">Ingresos vs Gastos</MDTypography>}
      description={
        <MDBox display="flex" justifyContent="space-between">
          <MDBox display="flex" ml={-1}>
            <MDBadgeDot color="info" size="sm" badgeContent="Ingresos" />
            <MDBadgeDot color="dark" size="sm" badgeContent="Egresos" />
          </MDBox>
          <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
            <Tooltip title="Seleccionar proyecto" placement="left" arrow>
              <Autocomplete
                defaultValue="Todos"
                sx={{
                  width: "300px",
                }}
                options={projects}
                renderInput={(params) => (
                  <MDInput {...params} variant="standard" />
                )}
              />
            </Tooltip>
          </MDBox>
        </MDBox>
      }
      chart={defaultLineChartData}
    />
  );
}

export default IncomesChart;
