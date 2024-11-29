import { Card, Grid } from "@mui/material";
import Index from ".";
import { getAll as getAllProcedures } from "/actions/procedures";
import { getAll as getAllActionTypes } from "/actions/action-types";

export const dynamic = "force-dynamic";

export default async function Procedures({ searchParams: { processId } }) {
  const {
    data: { procedures },
  } = await getAllProcedures({
    "filter[process_id]": processId,
    include: ["status", "dependencies", "actions.type", "author"],
  });

  const actionTypes = await getAllActionTypes();
  return (
    <Card>
      <Grid container spacing={4}>
        <Index
          procedures={procedures}
          actionTypes={actionTypes}
          processId={processId}
        />
      </Grid>
    </Card>
  );
}
