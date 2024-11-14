import { Card, Grid } from "@mui/material";
import CreateChart from "./components/conditional-chart/create-chart";

export const dynamic = "force-dynamic";

export default async function Procedures({ searchParams: { processId } }) {
  return (
    <Card>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CreateChart processId={processId} />
        </Grid>
      </Grid>
    </Card>
  );
}
