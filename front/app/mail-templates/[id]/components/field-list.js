import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

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
        {`{ ${slug} }`}
      </MDTypography>
    </MDBox>
  </MDBox>
);

const renderFieldList = () => {
  return ["Cliente", "Tarea", "Otros"].map(
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
          px={4}
          m={3}
          gap={1}
          sx={{ listStyle: "none" }}
        >
          {[
            { label: "Nombre del cliente", slug: "partner_name" },
            { label: "Direccion del cliente", slug: "partner_address" }, // TODO: Get the correct data
          ].map(({ label, slug }, index) => {
            return Row(label, slug, index);
          })}
        </MDBox>
      </Grid>
    )
  );
};

export default function FieldList() {
  return (
    <Card sx={{ width: "100%" }}>
      <MDBox pl={6} pr={4} py={4}>
        <MDTypography variant="h5">Campos combinados disponibles</MDTypography>
        <Divider />
        <Grid container spacing={2}>
          {renderFieldList()}
        </Grid>
      </MDBox>
    </Card>
  );
}
