import MDBox from "/components/MDBox";
import { Card, Grid } from "@mui/material";
import Table from "./components/table";
import Link from "next/link";
import MDButton from "/components/MDButton";
import { getAll } from "/actions/courts";

export default async function Page() {
  const courts = await getAll();

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={1} p={5}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Link href="/courts/create">
              <MDButton variant="gradient" color="dark">
                Nuevo Juzgado
              </MDButton>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Table rows={courts} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
