import MDBox from "/components/MDBox";
import Form from "./components/form";
import { Card } from "@mui/material";
import { getAll } from "/actions/procedures";

export default async function EditProcedure({ params: { id } }) {
  const {
    data: { procedures },
  } = await getAll({ include: ["dependencies"] });
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form procedureId={id} procedures={procedures} />
      </MDBox>
    </Card>
  );
}
