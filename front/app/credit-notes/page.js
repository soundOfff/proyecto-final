import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll } from "/actions/credit-notes";

export const dynamic = "force-dynamic";

export default async function CreditNotes({
  searchParams: { perPage = 10, page = 1, sort = "-id" },
}) {
  const include = ["status", "partner", "project", "credits"];
  const {
    data: { creditNotes },
    meta,
  } = await getAll({ include, perPage, page, sort });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={creditNotes} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
