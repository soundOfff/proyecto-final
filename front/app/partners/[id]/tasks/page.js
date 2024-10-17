import { Card, Grid } from "@mui/material";
import { getAll } from "/actions/tasks";
import MDBox from "/components/MDBox";
import Table from "/components/Tasks/table-server";
import { getCurrentTimer } from "/actions/timers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function PartnerTasks({
  params: { id },
  searchParams: { perPage = 50, page = 1 },
}) {
  const {
    data: { tasks },
    meta,
  } = await getAll({
    include: ["assigneds", "tags", "status", "dependencies", "author"],
    "filter[partner_id]": id,
    perPage: perPage,
    page: page,
  });

  const session = await getServerSession(authOptions);
  const currentTimer = await getCurrentTimer(session.staff.id);

  return (
    <MDBox my={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table
              tasks={tasks}
              meta={meta}
              currentTimer={currentTimer}
              partnerId={Number(id)}
            />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
