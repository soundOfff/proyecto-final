"use client";

import React, { useEffect, useState } from "react";
import MDBox from "/components/MDBox";
import MDBadgeDot from "/components/MDBadgeDot";
import MDInput from "/components/MDInput";
import MDTypography from "/components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";

import Tooltip from "@mui/material/Tooltip";

import DefaultLineChart from "/examples/Charts/LineCharts/DefaultLineChart";
import defaultLineChartData from "/pagesComponents/dashboards/sales/data/defaultLineChartData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import moment from "moment";

let projectData = {
  labels: [],
  datasets: [
    {
      label: "Facebook Ads",
      color: "info",
      data: [50, 100, 200, 190, 400, 350, 500, 450, 700],
    },
    {
      label: "Google Ads",
      color: "dark",
      data: [10, 30, 40, 120, 150, 220, 280, 250, 280],
    },
  ],
};

function IncomesChart({ projects }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  projectData.labels = Array.from({ length: 12 }, (_, i) => {
    const date = moment();
    date.subtract(12 - i, "months");
    return date.format("MMM YY");
  });

  const [selectedProject, setSelectedProject] = useState(
    searchParams.get("projectId")
  );

  const handleProjectChange = (event, value) => {
    setSelectedProject(value);
    const params = new URLSearchParams(searchParams);
    params.set("projectId", value.id);
  };

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (
      selectedProject &&
      Number(params.get("projectId")) !== selectedProject.id
    ) {
      params.set("projectId", selectedProject.id);

      const queryParams = params.toString();
      const query = queryParams ? `?${queryParams}` : "";

      router.push(`${pathname}${query}`);
    }
  }, [selectedProject]);

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
                value={selectedProject}
                sx={{
                  width: "500px",
                  marginLeft: "auto",
                  marginTop: 1,
                }}
                onChange={handleProjectChange}
                options={projects}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    variant="standard"
                    label="Proyecto"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Tooltip>
          </MDBox>
        </MDBox>
      }
      chart={projectData}
    />
  );
}

export default IncomesChart;
