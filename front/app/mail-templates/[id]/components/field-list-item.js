import { Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

export default function FieldListItem({ name, fields, handleSlugClick, key }) {
  const renderRow = (field, index) => (
    <MDBox key={`${key}-${index}`} component="li" mb={1}>
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
          {field}
        </MDTypography>
        <MDTypography
          variant="button"
          sx={{ color: "#008ece", cursor: "pointer" }}
          fontWeight="medium"
          textTransform="lowercase"
          onMouseDown={handleSlugClick}
        >
          {`{${field}}`}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return (
    <Grid key={key} xs={12} sm={6}>
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
        key={key}
        flexDirection="column"
        px={2}
        m={1}
        gap={1}
        sx={{ listStyle: "none" }}
      >
        {fields.map((f, index) => {
          return renderRow(f, index);
        })}
      </MDBox>
    </Grid>
  );
}
