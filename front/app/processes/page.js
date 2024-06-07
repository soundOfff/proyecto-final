import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";
import Table from "./components/table";
import { getAll as getAllProcesses } from "/actions/processes";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Proposals({
  searchParams: { perPage = 10, page = 1, sort = "-id" },
}) {
  const include = ["projectServiceType", "author"];
  const {
    data: { processes },
    meta,
  } = await getAllProcesses({
    sort,
    include,
    perPage,
    page,
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Link href="/processes/create">
              <MDButton variant="gradient" color="dark">
                Crear Proceso
              </MDButton>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Table rows={processes} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
