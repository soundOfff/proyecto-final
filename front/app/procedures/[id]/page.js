import MDBox from "/components/MDBox";
import Form from "/components/ProcedureForm/form";
import { Card } from "@mui/material";
import { getAll, show } from "/actions/procedures";
import { getAll as getAllActionTypes } from "/actions/action-types";

export default async function EditProcedure({ params: { id } }) {
  const actionTypes = await getAllActionTypes();
  const procedure = await show(id, {
    include: ["dependencies", "actions.type"],
  });
  const {
    data: { procedures },
  } = await getAll({
    include: ["dependencies", "actions"],
    "filter[process_id]": procedure.processId,
  });

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form
          procedure={procedure}
          procedures={procedures}
          actionTypes={actionTypes}
        />
      </MDBox>
    </Card>
  );
}
