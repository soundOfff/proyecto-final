import Form from "../components/form/form";
import { Card } from "@mui/material";
import MDBox from "/components/MDBox";
import { show } from "/actions/contacts";

export default async function Edit({ params: { contactId } }) {
  const contact = await show(contactId, { include: ["permissions"] });

  return (
    <MDBox my={3}>
      <Card>
        <Form contact={contact} />
      </Card>
    </MDBox>
  );
}
