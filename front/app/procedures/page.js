import { Card } from "@mui/material";
import Table from "./components/table";
import { getAll as getAllProcedures } from "/actions/procedures";
import { getAll as getAllActionTypes } from "/actions/action-types";
import ConditionalChart from "./components/conditional-chart";
import MDBox from "/components/MDBox";
import { show } from "/actions/processes";

export const dynamic = "force-dynamic";

export default async function Procedures({ searchParams: { processId } }) {
  const {
    data: { procedures },
  } = await getAllProcedures({
    "filter[process_id]": processId,
    include: ["status", "dependencies", "actions.type", "author"],
  });
  const process = await show(processId, {
    include: ["forks"],
  });
  const actionTypes = await getAllActionTypes();

  return (
    <Card>
      <MDBox p={5}>
        <Table
          procedures={procedures}
          actionTypes={actionTypes}
          processId={processId}
        />
        <ConditionalChart process={process} />
      </MDBox>
    </Card>
  );
}
