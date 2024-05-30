import MDBox from "/components/MDBox";
import Form from "./components/form";
import { Card } from "@mui/material";
import { getAll } from "/actions/actions";

export default async function CreateProcedure({ params: { id } }) {
  const actions = await getAll();
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form processId={id} actions={actions} />
      </MDBox>
    </Card>
  );
}
