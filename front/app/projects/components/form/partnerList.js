"use client";

import { Grid, Icon } from "@mui/material";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";

export default function PartnerList({
  partners,
  setFieldValue,
  partnerField,
  values,
}) {
  const deleteRow = (index) => {
    const filteredPartners = values[partnerField.name].filter(
      (_, i) => i !== index
    );

    setFieldValue(partnerField.name, filteredPartners);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Rol",
      accessor: "role",
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

  const table = { columns, rows: partners || [] };

  return (
    <Grid item xs={12} mb={5}>
      <MDBox
        py={2}
        borderRadius="lg"
        sx={{ border: 1, borderColor: "grey.400" }}
      >
        <DataTable table={table} showTotalEntries={false} isSorted={false} />
      </MDBox>
    </Grid>
  );
}
