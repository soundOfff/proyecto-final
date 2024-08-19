"use client";

import { Grid, Icon } from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";

export default function StaffList({
  rows = [],
  setFieldValue,
  staffsField,
  values,
}) {
  const deleteRow = (index) => {
    const filteredStaffs = values[staffsField.name].filter(
      (_, i) => i !== index
    );

    setFieldValue(staffsField.name, filteredStaffs);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }) => {
        return (
          <MDBox mr={1}>
            <MDButton
              variant="text"
              color="error"
              onClick={() => deleteRow(row.index)}
            >
              <Icon>delete</Icon>&nbsp;Borrar
            </MDButton>
          </MDBox>
        );
      },
    },
  ];

  const table = { columns, rows };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} mb={5}>
        <MDBox
          py={2}
          borderRadius="lg"
          sx={{ border: 1, borderColor: "grey.400" }}
        >
          <DataTable table={table} showTotalEntries={false} isSorted={false} />
        </MDBox>
      </Grid>
    </Grid>
  );
}
