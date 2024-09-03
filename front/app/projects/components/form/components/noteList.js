"use client";

import { Grid, Icon } from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";
import MDTypography from "/components/MDTypography";

export default function NoteList({ setFieldValue, notes, values }) {
  const deleteRow = (index) => {
    const filteredNotes = values[notes.name].filter((_, i) => i !== index);

    setFieldValue(notes.name, filteredNotes);
  };

  const columns = [
    {
      Header: "Nota",
      accessor: "content",
      width: "80%",
      Cell: ({ value }) => (
        <MDTypography
          dangerouslySetInnerHTML={{ __html: value }}
        ></MDTypography>
      ),
    },
    {
      Header: "Acciones",
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

  const table = { columns, rows: values[notes.name] ?? [] };

  return (
    <Grid container spacing={5} my={2}>
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
