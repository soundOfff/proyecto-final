import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Table from "./components/table";
import Loading from "./components/skeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "/pages/api/auth/[...nextauth]";

import { getAll as getAllTasks } from "/actions/tasks";
import { getAll as getAllProjects } from "/actions/projects";
import { Suspense } from "react";
import { getStats } from "/actions/tasks";
import Stats from "./components/stats";

const tasksInclude = ["timers", "status", "assigneds", "taskable", "partner"];
const projectsInclude = ["notes", "status"];

export default async function Tasks({ searchParams }) {
  const { type } = searchParams;
  const session = await getServerSession(authOptions);
  const staffFilter = { "filter[staff_id]": session.staff.id };

  const params = {
    include: type === "myProjects" ? projectsInclude : tasksInclude,
    ...staffFilter,
  };
  const data =
    type === "myProjects"
      ? await getAllProjects(params)
      : await getAllTasks(params);
  const stats = await getStats({ ownerId: session.staff.id });

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Suspense fallback={<Loading />}>
            <Stats data={stats} />
            <Card>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  {type === "myProjects"
                    ? "Casos en los que participo"
                    : "Mis tareas / Asignadas por mi"}
                </MDTypography>
              </MDBox>
              <MDBox py={1}>
                <Table rows={data} meta={{ per_page: "5" }} />
              </MDBox>
            </Card>
          </Suspense>
        </Grid>
      </Grid>
    </MDBox>
  );
}
