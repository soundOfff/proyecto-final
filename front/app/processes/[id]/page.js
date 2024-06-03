import { Card } from "@mui/material";
import Procedures from "./components/procedures";
import { getAll as getAllProcedures } from "/actions/procedures";
import { getAll as getAllActionTypes } from "/actions/action-types";
import MDBox from "/components/MDBox";

export const dynamic = "force-dynamic";

export default async function Show({ params: { id } }) {
  const {
    data: { procedures },
  } = await getAllProcedures({
    "filter[process_id]": id,
    include: ["status", "responsible", "dependencies", "actions.type"],
  });

  const actionTypes = await getAllActionTypes();

  return (
    <Card>
      <MDBox p={5}>
        <Procedures
          procedures={procedures}
          actionTypes={actionTypes}
          processId={id}
        />
      </MDBox>
    </Card>
  );
}
