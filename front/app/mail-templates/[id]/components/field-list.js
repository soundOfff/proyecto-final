"use client";

import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { getTableFields } from "/actions/table-field";
import { useEffect, useState } from "react";

const Row = (label, slug, index) => (
  <MDBox key={index} component="li" mb={1}>
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={4}
    >
      <MDTypography
        variant="button"
        fontWeight="medium"
        color="text"
        gutterBottom
      >
        {label}
      </MDTypography>
      <MDTypography
        variant="button"
        sx={{ color: "#008ece" }}
        fontWeight="medium"
        textTransform="lowercase"
      >
        {`{${slug}}`}
      </MDTypography>
    </MDBox>
  </MDBox>
);

const renderFieldList = (groupLabel, fields = []) => {
  return [groupLabel, "Cliente", "Otros"].map(
    (
      fieldGroup,
      index // TODO: Get the correct data
    ) => (
      <Grid key={index} xs={12} sm={6}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          bgColor="grey-100"
          sx={{ border: "1px solid #e0e0e0" }}
          p={1}
          mb={2}
        >
          <MDBox display="flex" gap={2} pl={4} flexDirection="column">
            <MDTypography variant="body4" color="text" fontWeight="bold">
              {fieldGroup}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          key={index}
          flexDirection="column"
          px={2}
          m={1}
          gap={1}
          sx={{ listStyle: "none" }}
        >
          {fields.map(({ label, slug }, index) => {
            return Row(label, slug, index);
          })}
        </MDBox>
      </Grid>
    )
  );
};

export default async function FieldList({ mailTemplate }) {
  const [fields, setFields] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fields = await getTableFields(mailTemplate.group.slug);
  //     setFields(fields);
  //   };

  //   fetchData();
  // },  [mailTemplate]); // TODO: Make this works

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox pl={4} pr={2} py={4}>
        <MDTypography variant="h5">Campos combinados disponibles</MDTypography>
        <Divider />
        <Grid container spacing={2}>
          {renderFieldList(mailTemplate.group.name)}
        </Grid>
      </MDBox>
    </Card>
  );
}
