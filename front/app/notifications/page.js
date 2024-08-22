import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll as getAllNotifications } from "../../actions/notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function Notifications({
  searchParams: { perPage = 10, page = 1, sort = "is_seen" },
}) {
  const session = await getServerSession(authOptions);

  const {
    data: { notifications },
    meta,
  } = await getAllNotifications({
    "filter[staffId]": session.staff.id,
    "filter[is_archived]": 0, // filter out archived notifications
    page,
    perPage,
    sort,
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={notifications} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
