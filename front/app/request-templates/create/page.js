import MDBox from "/components/MDBox";
import { Grid } from "@mui/material";
import Form from "../components/form";

export default async function RequestTemplateCreate() {
  return (
    <MDBox mb={3}>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12}>
          <MDBox py={1}>
            <Form />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
