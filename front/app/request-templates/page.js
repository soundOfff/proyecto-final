// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

import { getAll } from "/actions/request-templates";
import Table from "./components/table";
import Link from "next/link";
import { Card } from "@mui/material";

export const dynamic = "force-dynamic";

export default async function RequestTemplates({
  searchParams: { perPage = 50, page = 1 },
}) {
  const {
    data: { requestTemplates },
    meta,
  } = await getAll({ perPage, page });

  return (
    <Card>
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Link href="/request-templates/create">
            <MDButton variant="gradient" color="dark">
              Nuevo Template
            </MDButton>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <MDBox py={1}>
            <Table rows={requestTemplates} meta={meta} />
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}
