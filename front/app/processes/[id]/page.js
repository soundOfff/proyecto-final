import { Card } from "@mui/material";
import Procedures from "./components/procedures";
import { getAll as getAllProcedures } from "/actions/procedures";
import { getAll as getAllActions } from "/actions/actions";
import MDBox from "/components/MDBox";

export const dynamic = "force-dynamic";

export default async function Show({ params: { id } }) {
  const {
    data: { procedures },
  } = await getAllProcedures({
    "filter[process_id]": id,
    include: ["status", "responsible", "dependencies", "actions"],
  });

  const actions = await getAllActions();

  return (
    <Card>
      <MDBox p={5}>
        <Procedures procedures={procedures} actions={actions} />
      </MDBox>
    </Card>
  );
}
