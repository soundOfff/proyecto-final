import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "/components/MDBox";
import Table from "./components/Table/table";
import { getAll as getAllStaffs } from "/actions/staffs";

export default async function Staffs({
  searchParams: { perPage = 50, page = 1, sort = "last_login" },
}) {
  const {
    data: { staffs },
    meta,
  } = await getAllStaffs({ perPage, page, sort });
  return (
    <MDBox mb={3}>
      <Card>
        <Grid container spacing={3} p={5}>
          <Grid item xs={12}>
            <Table rows={staffs} meta={meta} />
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}
