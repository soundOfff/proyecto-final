"use client";

import DataTable from "/examples/Tables/DataTableServerPagination";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";

import { Autocomplete, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MONTHS = [
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
];
const YEARS = ["2024", "2023", "2022", "2021", "2020", "2019"];

export default function ExpensesTable({ rows, meta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || "2024"
  );

  const handleYearChange = (event, value) => {
    setSelectedYear(value);
    const params = new URLSearchParams(searchParams);
    params.set("year", value);
  };

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (params.get("year") !== selectedYear) {
      params.set("year", selectedYear);

      const queryParams = params.toString();
      const query = queryParams ? `?${queryParams}` : "";

      router.push(`${pathname}${query}`);
    }
  }, [selectedYear]);

  const columns = [
    {
      id: "category",
      Header: "Categoria",
      accessor: "category",
      width: "10%",
      Cell: ({ row }) => {
        return (
          <MDBox display="flex" justifyContent="start">
            <MDTypography variant="caption" color="text">
              {row.original.category}
            </MDTypography>
          </MDBox>
        );
      },
    },
    ...MONTHS.map((month, index) => {
      return {
        id: month,
        Header: month,
        accessor: month,
        width: "5%",
        Cell: ({ row }) => {
          return (
            <MDBox display="flex" justifyContent="center">
              <MDTypography variant="caption" color="text">
                {row.original.monthly[index].total_amount}
              </MDTypography>
            </MDBox>
          );
        },
      };
    }),
    {
      id: "total",
      Header: `Anual (${selectedYear})`,
      accessor: "total",
      width: "5%",
      Cell: ({ row }) => {
        return (
          <MDBox display="flex" justifyContent="start">
            <MDTypography variant="caption" color="dark" fontWeight="medium">
              {row.original.yearly_total}
            </MDTypography>
          </MDBox>
        );
      },
    },
  ];

  const table = { columns, rows };

  return (
    <Card sx={{ height: "100%" }} p={5}>
      <Grid container spacing={5} sx={{ paddingLeft: 5, paddingRight: 5 }}>
        <Grid item xs={12}>
          <MDBox display="flex" gap={4} sx={{ paddingTop: 5 }}>
            <MDTypography variant="h6">Gastos mensuales por año</MDTypography>
            <Autocomplete
              defaultValue={selectedYear}
              value={selectedYear}
              sx={{
                width: "120px",
              }}
              options={YEARS}
              renderInput={(params) => (
                <MDInput {...params} variant="standard" />
              )}
              onChange={handleYearChange}
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
