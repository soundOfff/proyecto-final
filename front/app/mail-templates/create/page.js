import MDBox from "/components/MDBox";
import MailTemplateForm from "./components/";
import { getAllLangs, getAllGroups } from "/actions/mail-templates";

export default async function MailTemplatesCreate() {
  const languages = await getAllLangs();
  const groups = await getAllGroups();

  return (
    <MDBox p={3}>
      <MailTemplateForm langs={languages} groups={groups} />
    </MDBox>
  );
}
