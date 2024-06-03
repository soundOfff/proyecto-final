import MDBox from "/components/MDBox";
import Form from "/components/ProcedureForm/form";
import { Card } from "@mui/material";
import { getAll } from "/actions/action-types";
import { getAll as getAllProcedures } from "/actions/procedures";

export default async function CreateProcedure({ searchParams: { processId } }) {
  const {
    data: { procedures },
  } = await getAllProcedures({
    include: ["dependencies", "actions"],
  });
  const actionTypes = await getAll();
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form
          processId={processId}
          procedures={procedures}
          actionTypes={actionTypes}
        />
      </MDBox>
    </Card>
  );
}
