// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

import { getAll as getAllPartners } from "/actions/partners";
import { getStats as getPartnerStats } from "/actions/partners";
import { getStats as getContactStats } from "/actions/contacts";

import Table from "./components/table";
import Stats from "./components/stats";
import Search from "./components/search";

const include = ["contacts"];

export const dynamic = "force-dynamic";

export default async function Partners({ searchParams }) {
  const { search, perPage = 50, page = 1, sort = "-id" } = searchParams;
  const searchFilter = search ? { "filter[search]": search } : null;

  const params = {
    include,
    ...searchFilter,
    perPage,
    page,
    sort,
  };

  const {
    data: { partners },
    meta,
  } = await getAllPartners(params);

  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} px={5} py={2}>
          <Grid item xs={12}>
            <Search />
            <MDBox py={1}>
              <Table rows={partners} meta={meta} />
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}