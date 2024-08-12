import MDBox from "/components/MDBox";
import Form from "/components/ProcedureForm/form";
import { Card } from "@mui/material";
import { getAll, show } from "/actions/procedures";
import { getAll as getAllActionTypes } from "/actions/action-types";
import { select as getAllStaffs } from "/actions/staffs";

export default async function EditProcedure({
  params: { id },
  searchParams: { processId },
}) {
  const actionTypes = await getAllActionTypes();
  const procedure = await show(id, {
    include: ["dependencies", "actions.type", "reminders.staff"],
  });
  const {
    data: { procedures },
  } = await getAll({
    include: ["dependencies", "actions"],
    "filter[process_id]": procedure.processId,
  });
  const staffs = await getAllStaffs();
  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form
          processId={processId}
          procedure={procedure}
          procedures={procedures}
          actionTypes={actionTypes}
          staffs={staffs}
        />
      </MDBox>
    </Card>
  );
}
