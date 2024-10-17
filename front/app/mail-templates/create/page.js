import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { Card } from "@mui/material";
import MailTemplateForm from "./components/";
import { getAllLangs, getAllGroups } from "/actions/mail-templates";

export default async function MailTemplatesCreate() {
  const languages = await getAllLangs();
  const groups = await getAllGroups();

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <MDTypography variant="h5" mb={2}>
          Nuevo Template de Correo
        </MDTypography>
        <MailTemplateForm langs={languages} groups={groups} />
      </MDBox>
    </Card>
  );
}
