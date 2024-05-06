import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/table";
import { getAll as getAllProposals } from "/actions/proposals";

export const dynamic = "force-dynamic";

export default async function Proposals({
  params: { id },
  searchParams: { perPage = 10, page = 1, sort = "-id" },
}) {
  const include = [
    "currency",
    "estimate",
    "invoice",
    "proposable",
    "tags",
    "status",
    "comments",
  ];
  const {
    data: { proposals },
    meta,
  } = await getAllProposals({
    sort,
    "filter[proposable_id]": id,
    include,
    perPage,
    page,
  });

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={proposals} meta={meta} partnerId={id} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
