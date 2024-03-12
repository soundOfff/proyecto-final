"use client";
import React from "react";
import numberFormat from "/utils/numberFormat";
import Grid from "@mui/material/Grid";
import DefaultStatisticsCard from "/examples/Cards/StatisticsCards/DefaultStatisticsCard";
import MDBox from "/components/MDBox";

export default function Stats({ data }) {
  const getPercentageColor = (percentage) => {
    if (percentage < 0) {
      return "error";
    }
    if (percentage > 0) {
      return "success";
    }
    return "secondary";
  };

  return (
    <MDBox mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <DefaultStatisticsCard
            title="Tiempo total registrado en el dia"
            count={`${numberFormat(data.total_day_time)} hs`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DefaultStatisticsCard
            title="Tiempo registrado en el mes actual"
            count={`${numberFormat(data.total_month_time)} hs`}
            percentage={{
              color: `${getPercentageColor(data.monthly_percentage)}`,
              value: `${numberFormat(data.monthly_percentage)}%`,
              label: "desde el ultimo mes",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DefaultStatisticsCard
            title="Tiempo registrado en la semana"
            count={`${numberFormat(data.total_week_time)} hs`}
            percentage={{
              color: `${getPercentageColor(data.weekly_percentage)}`,
              value: `${numberFormat(data.weekly_percentage)}%`,
              label: "desde la ultima semana",
            }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
