import Info from "./components/info";
import Table from "./components/table";
import MDBox from "/components/MDBox";
import { getAll as getAllProjects } from "/actions/projects";
import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]";
import { getStats } from "/actions/tasks";
import Stats from "./components/stats";

export default async function Profile() {
  const include = ["notes", "status", "files"];
  const session = await getServerSession(authOptions);
  const filter = { "filter[staff_id]": session.staff.id };
  const params = { include, ...filter };
  const stats = await getStats({ ownerId: session.staff.id });

  const {
    data: { projects },
  } = await getAllProjects(params);
  return (
    <MDBox>
      <Info />
      <Stats data={stats} />
      <Table rows={projects} />
    </MDBox>
  );
}
