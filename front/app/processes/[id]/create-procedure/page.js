import MDBox from "/components/MDBox";
import Form from "./components/form";
import { Card } from "@mui/material";

export default async function CreateProcedure({ params: { id } }) {
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form processId={id} />
      </MDBox>
    </Card>
  );
}
