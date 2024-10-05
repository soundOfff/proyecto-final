"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";

import { Autocomplete, Box, Card, Grid } from "@mui/material";

export default function ExpensesTable({ rows, meta }) {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
    "Anual (2024)",
  ];

  const years = ["2024", "2023", "2022", "2021", "2020"];

  const columns = [
    {
      id: "category",
      Header: "Categoria",
      accessor: "category",
      width: "10%",
    },
    ...months.map((month) => {
      return {
        id: month,
        Header: month,
        accessor: month,
        width: "5%",
        Cell: ({ row }) => {
          return (
            <MDBox display="flex" justifyContent="center">
              <MDTypography variant="body2" color="text">
                $20.00
              </MDTypography>
            </MDBox>
          );
        },
      };
    }),
  ];

  const table = { columns, rows };

  return (
    <Card sx={{ height: "100%" }} p={5}>
      <Grid container spacing={5} sx={{ paddingLeft: 5, paddingRight: 5 }}>
        <Grid item xs={12}>
          <MDBox display="flex" gap={4} sx={{ paddingTop: 5 }}>
            <MDTypography variant="h6">Gastos mensuales por año</MDTypography>
            <Autocomplete
              defaultValue="2024"
              sx={{
                width: "120px",
              }}
              options={years}
              renderInput={(params) => (
                <MDInput {...params} variant="standard" />
              )}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            table={table}
            meta={meta}
            showTotalEntries={true}
            isSorted={true}
            noEndBorder
          />
        </Grid>
      </Grid>
    </Card>
  );
}
