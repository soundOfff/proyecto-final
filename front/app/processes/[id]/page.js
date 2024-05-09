import { Card } from "@mui/material";
import Procedures from "./components/procedures";
import { show } from "/actions/processes";
import MDBox from "/components/MDBox";

export default async function Show({ params: { id } }) {
  const process = await show(id, {
    include: ["project", "procedures.status", "procedures.responsible"],
  });

  return (
    <Card>
      <MDBox p={5}>
        <Procedures procedures={process.procedures} />
      </MDBox>
    </Card>
  );
}
