import MDBox from "/components/MDBox";
import Form from "/components/ProcedureForm/form";
import { Card } from "@mui/material";
import { getAll as getAllActionTypes } from "/actions/action-types";
import { getAll as getAllProcedures } from "/actions/procedures";
import { select as getAllStaffs } from "/actions/staffs";
import { getAll as getAllMailTemplates } from "/actions/mail-templates";

export const dynamic = "force-dynamic";

export default async function CreateProcedure({ searchParams: { processId } }) {
  const {
    data: { procedures },
  } = await getAllProcedures({
    include: ["dependencies", "actions"],
    "filter[process_id]": processId,
  });
  const actionTypes = await getAllActionTypes();
  const staffs = await getAllStaffs();
  const mailTemplates = await getAllMailTemplates({
    include: "lang",
  });

  return (
    <Card sx={{ overflow: "visible", my: 3 }}>
      <MDBox p={3}>
        <Form
          processId={processId}
          procedures={procedures}
          actionTypes={actionTypes}
          staffs={staffs}
          mailTemplates={mailTemplates}
        />
      </MDBox>
    </Card>
  );
}
