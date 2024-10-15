import MDBox from "/components/MDBox";
import Form from "/components/ProcedureForm/form";
import { Card } from "@mui/material";
import { getAll, show } from "/actions/procedures";
import { getAll as getAllActionTypes } from "/actions/action-types";
import { getAll as getAllMailTemplates } from "/actions/mail-templates";
import { getAll as getAllStaffs } from "/actions/staffs";

export default async function EditProcedure({ params: { id } }) {
  const procedure = await show(id, {
    include: ["dependencies", "actions.type", "reminders.staff"],
  });
  const {
    data: { procedures },
  } = await getAll({
    include: ["dependencies", "actions"],
    "filter[process_id]": procedure.processId,
  });
  const {
    data: { staffs },
  } = await getAllStaffs();
  const mailTemplates = await getAllMailTemplates({
    include: "lang",
  });
  const actionTypes = await getAllActionTypes();

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form
          processId={processId}
          procedure={procedure}
          procedures={procedures}
          actionTypes={actionTypes}
          staffs={staffs}
          mailTemplates={mailTemplates}
        />
      </MDBox>
    </Card>
  );
}
