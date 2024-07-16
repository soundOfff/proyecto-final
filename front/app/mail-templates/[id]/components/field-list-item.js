import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { getTableFields } from "/actions/table-field";

export default function FieldListItem({ index, name, slug, handleSlugClick }) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    getTableFields({ table: slug }).then((fields) => {
      setFields(fields);
    });
  }, []);

  const renderRow = (field, index) => (
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
          {field.field}
        </MDTypography>
        <MDTypography
          variant="button"
          sx={{ color: "#008ece", cursor: "pointer" }}
          fontWeight="medium"
          textTransform="lowercase"
          onMouseDown={handleSlugClick}
        >
          {`{${field.field}}`}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return (
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
            {name}
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
        {fields.map((field, index) => {
          return renderRow(field, index);
        })}
      </MDBox>
    </Grid>
  );
}
