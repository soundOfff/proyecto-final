import MDBox from "/components/MDBox";
import Form from "./components/index";
import { Grid } from "@mui/material";
import { show as getMailTemplate } from "/actions/mail-templates";
import FieldList from "./components/field-list";

export const dynamic = "force-dynamic";

export default async function MailTemplates({ params }) {
  const { id } = params;
  const mailTemplate = await getMailTemplate(id, { include: ["group"] });

  return (
    <MDBox mb={3} width="100%">
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Form mailTemplate={mailTemplate} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldList mailTemplate={mailTemplate} />
        </Grid>
      </Grid>
    </MDBox>
  );
}
