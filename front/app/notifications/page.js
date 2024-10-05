import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import {
  getAll as getAllNotifications,
  getAllPriorities,
} from "/actions/notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function Notifications({
  searchParams: {
    perPage = 50,
    page = 1,
    sort = "is_seen",
    type,
    search,
    isSeen,
  },
}) {
  const session = await getServerSession(authOptions);

  const isSeenFilter =
    isSeen != undefined ? { "filter[is_seen]": isSeen } : null;
  const searchFilter = search ? { "filter[search]": search } : null;

  const {
    data: { notifications },
    meta,
  } = await getAllNotifications({
    "filter[staff_id]": session?.staff?.id,
    "filter[is_archived]": type == "archived" ? true : false,
    ...isSeenFilter,
    ...searchFilter,
    include: ["creator", "notifiable", "priority"],
    page,
    perPage,
    sort,
  });
  const priorities = await getAllPriorities();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={notifications} priorities={priorities} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
