import { show } from "/actions/request-templates";

import MDBox from "/components/MDBox";
import { Grid } from "@mui/material";
import Form from "../../components/form";

export default async function EditRequestTemplate({ params: { id } }) {
  const requestTemplate = await show(id);

  return (
    <MDBox mb={3}>
      <Grid container spacing={2} py={2}>
        <Grid item xs={12}>
          <MDBox py={1}>
            <Form requestTemplate={requestTemplate} />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
