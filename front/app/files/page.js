import MDBox from "/components/MDBox";
import { Card, Grid } from "@mui/material";
import Table from "./components/table";
import { getAll } from "/actions/files";
import Link from "next/link";
import MDButton from "/components/MDButton";

export const dynamic = "force-dynamic";

export default async function File({
  searchParams: { perPage = 10, page = 1 },
}) {
  const {
    data: { files },
    meta,
  } = await getAll({
    perPage,
    page,
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={1} p={5}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Link href="/files/create">
              <MDButton variant="gradient" color="dark">
                Nuevo Archivo
              </MDButton>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Table rows={files} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
