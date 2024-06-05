import React from "react";
import { Grid, Icon } from "@mui/material";
import MDButton from "/components/MDButton";
import Select from "/components/Select";
import DataTable from "/examples/Tables/DataTable";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function RelatedPersonFormComponent({
  setFieldValue: setExternalFieldValue,
  values: externalValues,
}) {
  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Cargo de la Persona",
      accessor: "type.label",
    },
    {
      Header: "Fecha inicio",
      accessor: "phone",
    },
    {
      Header: "Fecha fin",
      accessor: "email",
    },
    {
      Header: "Activo",
      accessor: "active",
      Cell: ({ value }) => (value ? <Icon>check</Icon> : <Icon>close</Icon>),
    },
  ];

  const table = {
    columns,
    rows: [
      {
        name: "Juan Perez",
        type: { label: "Persona Física" },
        phone: "01/01/2021",
        email: "01/01/2021",
        active: true,
      },
      {
        name: "Juan Perez",
        type: { label: "Persona Física" },
        phone: "01/01/2021",
        email: "01/01/2021",
        active: true,
      },
      {
        name: "Juan Perez",
        type: { label: "Persona Física" },
        phone: "01/01/2021",
        email: "01/01/2021",
        active: true,
      },
    ],
  };

  return (
    <Grid
      item
      xs={12}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={5}
      sx={{
        paddingLeft: "80px !important",
        paddingRight: "80px",
      }}
    >
      <MDTypography variant="h5">Personas Relacionadas</MDTypography>
      <MDBox
        display="flex"
        flexDirection="row"
        justifyContent="start"
        alignContent="center"
        sx={{ width: "75%" }}
        gap={5}
      >
        <Select
          value={0}
          options={[]}
          optionLabel={(option) => option.mergedName}
          fieldName={"relatedPersonId"}
          sx={{ width: "550px" }}
          inputLabel={"Persona Relacionada"}
          setFieldValue={setExternalFieldValue}
        />
        <MDButton
          variant="gradient"
          color="dark"
          display="flex"
          sx={{ width: "fit-content" }}
          gap={1}
          alignContent="center"
          onClick={() => {}}
        >
          Agregar Persona
        </MDButton>
      </MDBox>
      <MDBox
        py={2}
        px={2}
        borderRadius="lg"
        sx={{ border: 1, borderColor: "grey.400" }}
      >
        <DataTable table={table} showTotalEntries={false} isSorted={false} />
      </MDBox>
    </Grid>
  );
}
